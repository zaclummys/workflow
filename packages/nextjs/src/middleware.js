import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { validateSession } from '@workflow/core';

function isGuestRoute (request) {
    const guestRoutes = ['/sign-in', '/sign-up'];

    return guestRoutes.includes(request.nextUrl.pathname);
}

function getCookieSessionToken () {
    return cookies().get('session_token');
}

function deleteCookieSessionToken () {
    cookies().delete('session_token');
}

function redirectToSignIn (request) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
}

function redirectToDashboard (request) {
    return NextResponse.redirect(new URL('/', request.url));
}

export default async function middleware (request) {
    const cookieSessionToken = getCookieSessionToken();

    if (cookieSessionToken) {
        const isValidSession = validateSession({
            sessionToken: cookieSessionToken.value,
        });

        if (!isValidSession) {
            deleteCookieSessionToken();

            return redirectToSignIn(request);
        }

        if (isGuestRoute(request)) {
            return redirectToDashboard(request);
        } else {
            return NextResponse.next();
        }        
    } else {
        if (!isGuestRoute(request)) {
            return redirectToSignIn(request);
        } else {
            return NextResponse.next();
        }       
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
