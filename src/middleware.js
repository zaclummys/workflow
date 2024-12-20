import {
    NextResponse, 
} from 'next/server';

import { sessionTokenCookieName } from "~/cookies";

async function validateSession ({
    cookie,
    baseUrl,
}) {
    try {
        const validateUrl = new URL('/api/session/validate', baseUrl);
        
        const response = await fetch(validateUrl, {
            method: 'POST',
            headers: {
                'Cookie': cookie,
            },
        });

        if (!response.ok) {
            return {
                success: false,
            };
        }

        return await response.json();
    } catch (error) {
        return {
            success: false,
        }
    }
}

function isGuestRoute (request) {
    const guestRoutes = [
        '/sign-in',
        '/sign-up',
    ];

    return guestRoutes.includes(request.nextUrl.pathname);
}

function isIgnoreRoute (request) {
    const ignoreRoutes = [
        '/favicon.ico',
        '/internal-server-error',
    ];

    return ignoreRoutes.includes(request.nextUrl.pathname);
}

export default async function middleware (request) {
    if (isIgnoreRoute(request)) {
        return NextResponse.next();
    }
    
    const homeUrl = new URL('/', request.url);
    const signInUrl = new URL('/sign-in', request.url);
    const internalServerErrorUrl = new URL('/internal-server-error', request.url);

    const sessionTokenCookie = request.cookies.get(sessionTokenCookieName);
    
    if (!sessionTokenCookie || !sessionTokenCookie.value) {
        let response;

        if (isGuestRoute(request)) {
            response = NextResponse.next();
        } else {
            response = NextResponse.redirect(signInUrl);
        }

        if (sessionTokenCookie && !sessionTokenCookie.value) {
            response.cookies.delete(sessionTokenCookieName);
        }

        return response;
    }
    
    const { success, valid } = await validateSession({
        baseUrl: request.url,
        cookie: request.headers.get('cookie'),
    });
    
    if (!success) {
        return NextResponse.rewrite(internalServerErrorUrl);
    }
    
    if (!valid) {
        const response = NextResponse.redirect(signInUrl);

        response.cookies.delete(sessionTokenCookieName);

        return response;
    }
    
    if (isGuestRoute(request)) {
        return NextResponse.redirect(homeUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
