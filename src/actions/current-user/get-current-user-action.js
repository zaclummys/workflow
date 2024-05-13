'use server';

import getUserBySessionToken from '~/core/application/get-user-by-session-token';

import { getSessionToken } from '~/actions/cookies';

export default async function getCurrentUserAction () {
    const sessionToken = getSessionToken();

    return getUserBySessionToken({
        sessionToken,
    });
}
