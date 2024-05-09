import getUserBySessionToken from '@workflow/core/get-user-by-session-token';

import { getSessionTokenFromCookies } from './session';

export default async function getUser () {
    const sessionToken = getSessionTokenFromCookies();

    return getUserBySessionToken({
        sessionToken,
    });
}
