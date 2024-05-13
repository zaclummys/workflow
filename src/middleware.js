import { NextResponse } from 'next/server';

async function validateSession ({ sessionToken }) {    
    const response = await fetch(new URL('http://localhost:3000/api/session/validate'), {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionToken
        }),
    });

    if (!response.ok) {
        console.error('Expected a OK response, but got: ' + response.status);

        return {
            success: false,
        };
    }

    const { isSessionValid } = await response.json();

    return {
        success: true,
        isSessionValid,
    };
}

function isGuestRoute (request) {
    const guestRoutes = ['/sign-in', '/sign-up'];

    return guestRoutes.includes(request.nextUrl.pathname);
}

function redirectToSignIn (request) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
}

function redirectToSignInDeletingSessionCookie (request) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url));

    response.cookies.delete('session_token');

    return response;
}

function redirectToHome (request) {
    return NextResponse.redirect(new URL('/', request.url));
}

export default async function middleware (request) {
    if (request.nextUrl.pathname === '/favicon.ico') {
        return NextResponse.next();
    }

    console.info(`Middleware: ${request.nextUrl.toString()}`);

    const sessionTokenCookie = request.cookies.get('session_token');

    if (sessionTokenCookie) {
        if (!sessionTokenCookie.value) {
            return redirectToSignInDeletingSessionCookie(request);
        }

        const { success, isSessionValid } = await validateSession({
            sessionToken: sessionTokenCookie.value,
        });

        if (!success) {
            return redirectToSignIn(request);
        }

        if (!isSessionValid) {
            return redirectToSignInDeletingSessionCookie(request);
        }

        if (isGuestRoute(request)) {
            return redirectToHome(request);
        }

        return NextResponse.next();
    }

    if (isGuestRoute(request)) {
        return NextResponse.next();
    } else {
        return redirectToSignIn(request);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
