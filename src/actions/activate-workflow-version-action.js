import { getSessionToken } from "./cookies";

import activateWorkflowVersion from '~/core/application/activate-workflow-version'

export default async function activateWorkflowVersionAction (workflowVersionId) {
    const sessionToken = getSessionToken();

    return activateWorkflowVersion({
        sessionToken,
        workflowVersionId,
    });
}