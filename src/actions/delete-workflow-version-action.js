'use server';

import {
    getSessionToken, 
} from '~/actions/cookies';

import deleteWorkflowVersion from '~/core/application/delete-workflow-version';

export default async function deleteWorkflowVersionAction (workflowVersionId) {
    const sessionToken = getSessionToken();

    return deleteWorkflowVersion({
        workflowVersionId,
        sessionToken,
    });
}