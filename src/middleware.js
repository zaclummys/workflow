import {
    NextResponse, 
} from 'next/server';

import { sessionTokenCookieName } from "~/cookies";

async function validateSession ({
    sessionToken,
    baseUrl,
}) {
    try {
        const validateUrl = new URL('/api/session/validate', baseUrl);
        
        const response = await fetch(validateUrl, {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionToken }),
        });

        if (!response.ok) {
            console.error('[Validate Session] Did not receive an OK:', response.status);

            return {
                success: false,
            };
        }

        const { success, valid } = await response.json();

        if (!success) {
            console.error('[Validate Session] Did not receive a success.');
        }
        
        return {
            success,
            valid,
        };
    } catch (error) {
        console.error('[Validate Session] An error was thrown:', error);

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
    
    const sessionTokenCookie = request.cookies.get(sessionTokenCookieName);

    const homeUrl = new URL('/', request.url);
    const signInUrl = new URL('/sign-in', request.url);
    const internalServerErrorUrl = new URL('/internal-server-error', request.url);
    
    if (!sessionTokenCookie) {
        if (isGuestRoute(request)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(signInUrl);
        }
    }
    
    const sessionToken = sessionTokenCookie.value;
    
    if (!sessionToken) {
        const response = NextResponse.redirect(signInUrl);
        
        response.cookies.delete(sessionTokenCookieName);
        
        return response;
    }

    const { success, valid } = await validateSession({
        sessionToken: sessionToken,
        baseUrl: request.url,
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
