'use server';

import createWorkflow from '~/core/application/create-workflow';
import {
    getSessionToken, 
} from '~/cookies';

export default async function createWorkflowAction ({
    name,
    description,
    workspaceId,
}) {
    const sessionToken = await getSessionToken();

    return createWorkflow({
        name,
        description,
        workspaceId,
        sessionToken,
    });
}
