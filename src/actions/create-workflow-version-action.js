'use server';

import { getSessionToken } from '~/actions/cookies';

import createWorkflowVersion from '~/core/application/create-workflow-version';

export default async function createWorkflowVersionAction (workflowId) {
    const sessionToken = getSessionToken();

    return createWorkflowVersion({
        workflowId,
        sessionToken,
    });
}