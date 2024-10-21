'use server';

import { getSessionToken } from '~/cookies';

import createWorkflowVersion from '~/core/application/create-workflow-version';

export default async function createWorkflowVersionAction (workflowId) {
    const sessionToken = await getSessionToken();

    return createWorkflowVersion({
        workflowId,
        sessionToken,
    });
}