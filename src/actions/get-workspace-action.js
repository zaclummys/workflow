import {
    getSessionToken, 
} from '~/cookies';
import getWorkspace from '~/core/application/get-workspace';

export default async function getWorkspaceAction (workspaceId) {
    const sessionToken = getSessionToken();

    return getWorkspace({
        workspaceId,
        sessionToken,
    });
}