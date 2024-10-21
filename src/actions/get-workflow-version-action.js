import {
    getSessionToken, 
} from "../cookies";

import getWorkflowVersion from "~/core/application/get-workflow-version";

export default async function getWorkflowVersionAction (workflowVersionId) {
    const sessionToken = await getSessionToken();

    return getWorkflowVersion({
        workflowVersionId,
        sessionToken,
    });
}