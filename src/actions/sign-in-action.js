'use server';

import signIn from '~/core/application/sign-in';

import {
    setSessionToken, 
} from '~/cookies';

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
        await setSessionToken(sessionToken);
    }

    return {
        success,
        message,
    };
}
