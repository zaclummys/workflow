import {
    NextResponse, 
} from 'next/server';

async function validateSession ({ sessionToken }) {    
    const response = await fetch(new URL('http://localhost:3000/api/session/validate'), {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionToken,
        }),
    });

    if (!response.ok) {
        console.error(await response.text());

        return {
            success: false,
        };
    }

    const { success } = await response.json();

    return {
        success,
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
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }
    
    if (request.nextUrl.pathname === '/favicon.ico') {
        return NextResponse.next();
    }

    const sessionTokenCookie = request.cookies.get('session_token');

    if (sessionTokenCookie) {
        if (!sessionTokenCookie.value) {
            return redirectToSignInDeletingSessionCookie(request);
        }

        const { success } = await validateSession({
            sessionToken: sessionTokenCookie.value,
        });

        if (!success) {
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
