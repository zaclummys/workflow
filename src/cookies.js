import {
    cookies, 
} from 'next/headers';

import { redirect } from 'next/navigation'

export const sessionTokenCookieName = 'session_token';

export function getSessionToken () {
    const sessionTokenCookie = cookies().get(sessionTokenCookieName);
    
    if (!sessionTokenCookie || !sessionTokenCookie.value) {
        return null;
    }

    return sessionTokenCookie.value;
}

export function setSessionToken (sessionToken) {
    cookies().set(sessionTokenCookieName, sessionToken, {
        path: '/',
        httpOnly: true,
    });
}
