'use server';

import {
    getSessionToken, 
} from '~/cookies';

import deleteWorkspace from '~/core/application/delete-workspace';

export default async function deleteWorkspaceAction (workspaceId) {
    const sessionToken = getSessionToken();

    return deleteWorkspace({
        workspaceId,
        sessionToken,
    });
}