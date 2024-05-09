import getUserBySessionToken from '@workflow/core/get-user-by-session-token';

import { getSessionToken } from '~/actions/cookies';

export default async function getUserAction () {
    const sessionToken = getSessionToken();

    return getUserBySessionToken({
        sessionToken,
    });
}
