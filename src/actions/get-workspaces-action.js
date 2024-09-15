'use server';

import getWorkspaces from '~/core/application/get-workspaces';
import {
    getSessionToken, 
} from '~/cookies';

export default async function getWorkspacesAction () {
    const sessionToken = getSessionToken();

    return getWorkspaces({
        sessionToken,
    });
}
