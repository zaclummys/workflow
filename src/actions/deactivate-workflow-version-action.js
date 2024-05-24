import { getSessionToken } from "./cookies";

import deactivateWorkflowVersion from '~/core/application/deactivate-workflow-version'

export default async function deactivateWorkflowVersionAction (workflowVersionId) {
    const sessionToken = getSessionToken();

    return deactivateWorkflowVersion({
        sessionToken,
        workflowVersionId,
    });
}