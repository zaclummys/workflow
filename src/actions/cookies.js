import {
    cookies, 
} from 'next/headers';

export function getSessionToken () {
    const sessionTokenCookie = cookies().get('session_token');

    if (!sessionTokenCookie) {
        throw new Error('Session Token Cookie not found');
    }

    const sessionToken = sessionTokenCookie.value;

    if (!sessionToken) {
        throw new Error('Session Token cannot be empty');
    }

    return sessionToken;
}

export function setSessionToken (sessionToken) {
    cookies().set('session_token', sessionToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
}

export function deleteSessionToken () {
    cookies().delete('session_token');
}
