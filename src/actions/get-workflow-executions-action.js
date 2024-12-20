import { getSessionToken } from "../cookies";

import getWorkflowExecutions from "~/core/application/get-workflow-executions";

export default async function getWorkflowExecutionsAction (workflowVersionId) {
    const sessionToken = await getSessionToken();

    return getWorkflowExecutions({
        workflowVersionId,
        sessionToken,
    });
}