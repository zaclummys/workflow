import {
    getSessionToken, 
} from '~/cookies';
import getWorkspace from '~/core/application/get-workspace';

export default async function getWorkspaceAction (workspaceId) {
    const sessionToken = await getSessionToken();

    return getWorkspace({
        workspaceId,
        sessionToken,
    });
}