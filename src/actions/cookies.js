import {
    cookies, 
} from 'next/headers';

import {
    redirect,
} from 'next/navigation';

export function getSessionToken () {
    const sessionTokenCookie = cookies().get('session_token');

    if (!sessionTokenCookie) {
        redirect('/sign-in');
    }

    const sessionToken = sessionTokenCookie.value;

    if (!sessionToken) {
        redirect('/sign-in');
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
