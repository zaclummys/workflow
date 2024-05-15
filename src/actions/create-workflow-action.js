'use server';

import createWorkflow from '~/core/application/create-workflow';
import { getSessionToken } from '~/actions/cookies';

export default async function createWorkflowAction ({
    name,
    description,
    workspaceId,
}) {
    const sessionToken = getSessionToken();

    return createWorkflow({
        name,
        description,
        workspaceId,
        sessionToken,
    });
}
