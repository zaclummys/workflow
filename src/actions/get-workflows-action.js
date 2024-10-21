import {
    getSessionToken, 
} from "../cookies";
import getWorkflows from "~/core/application/get-workflows";

export default async function getWorkflowsAction (workspaceId) {
    const sessionToken = await getSessionToken();

    return getWorkflows({
        sessionToken,
        workspaceId,
    });
}