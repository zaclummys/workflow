import { getSessionToken } from "../cookies";

import getWorkflowExecution from "~/core/application/get-workflow-execution";

export default async function getWorkflowExecutionAction (workflowExecutionId) {
    const sessionToken = await getSessionToken();

    return getWorkflowExecution({
        sessionToken,
        workflowExecutionId,
    });
}