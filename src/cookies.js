import {
    cookies, 
} from 'next/headers';

export const sessionTokenCookieName = 'session_token';

export function getSessionToken () {
    const sessionTokenCookie = cookies().get(sessionTokenCookieName);

    return sessionTokenCookie?.value;
}

export function setSessionToken (sessionToken) {
    cookies().set(sessionTokenCookieName, sessionToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
}

export function deleteSessionToken () {
    cookies().delete(sessionTokenCookieName);
}
