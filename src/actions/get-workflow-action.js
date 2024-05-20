import {
    getSessionToken, 
} from "./cookies";
import getWorkflow from "~/core/application/get-workflow";

export default async function getWorkflowAction (workflowId) {
    const sessionToken = getSessionToken();

    return getWorkflow({
        workflowId,
        sessionToken,
    });
}