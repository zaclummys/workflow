import { cookies } from 'next/headers';

export function getSessionTokenFromCookies () {
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
