import {
    getSessionToken, 
} from "../cookies";
import getWorkflow from "~/core/application/get-workflow";

export default async function getWorkflowAction (workflowId) {
    const sessionToken = await getSessionToken();

    return getWorkflow({
        workflowId,
        sessionToken,
    });
}