'use server';

import {
    getSessionToken, 
} from '~/cookies';

import deleteWorkflowVersion from '~/core/application/delete-workflow-version';

export default async function deleteWorkflowVersionAction (workflowVersionId) {
    const sessionToken = await getSessionToken();

    return deleteWorkflowVersion({
        workflowVersionId,
        sessionToken,
    });
}