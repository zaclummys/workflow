import getWorkspaces from '@workflow/core/get-workspaces';

import { getSessionTokenFromCookies } from './session';

export default async function getCurrentUserWorkspaces () {
    const sessionToken = getSessionTokenFromCookies();

    return getWorkspaces({
        sessionToken,
    });
}
