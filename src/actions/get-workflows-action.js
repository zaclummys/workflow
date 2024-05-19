import { getSessionToken } from "./cookies";

import getWorkflows from "~/core/application/get-workflows";

export default async function getWorkflowsAction (workspaceId) {
    const sessionToken = getSessionToken();

    return getWorkflows({
        sessionToken,
        workspaceId,
    });
}