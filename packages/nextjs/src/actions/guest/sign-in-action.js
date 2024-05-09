'use server';

import { cookies } from 'next/headers';
import signIn from '@workflow/core/sign-in';

function setSessionTokenCookie (sessionToken) {
    cookies().set('session_token', sessionToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
}

export default async function signInAction ({ email, password }) {
    const {
        success,
        message,
        sessionToken,
    } = await signIn({
        email,
        password,
    });

    if (success) {        
        setSessionTokenCookie(sessionToken);
    }

    return {
        success,
        message,
    };
}
