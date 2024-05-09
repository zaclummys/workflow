'use server';

import signIn from '@workflow/core/sign-in';
import { setSessionToken } from '~/actions/cookies';

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
        setSessionToken(sessionToken);
    }

    return {
        success,
        message,
    };
}
