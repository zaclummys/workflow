'use server';

import {
    getSessionToken, 
} from '~/actions/cookies';

import deleteWorkflow from '~/core/application/delete-workflow';

export default async function deleteWorkflowAction (workflowId) {
    const sessionToken = getSessionToken();

    return deleteWorkflow({
        workflowId,
        sessionToken,
    });
}