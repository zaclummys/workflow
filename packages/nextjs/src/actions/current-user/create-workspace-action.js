import createWorkspace from '@workflow/core/create-workspace';
import { getSessionToken } from '~/actions/cookies';

export default async function createWorkspaceAction ({
    name,
    description,
}) {
    const sessionToken = getSessionToken();

    return createWorkspace({
        name,
        description,
        sessionToken,
    });
}
