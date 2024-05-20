'use server';

import createWorkspace from '~/core/application/create-workspace';
import {
    getSessionToken, 
} from '~/actions/cookies';

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
