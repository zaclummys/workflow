import getWorkspace from "./application/get-workspace";
import getWorkflow from "./application/get-workflow";
import getWorkflowVersion from "./application/get-workflow-version";
import validateSession from "./application/validate-session";

import findWorkflowById from "./data/mongodb/find-workflow-by-id";
import findWorkspaceById from "./data/mongodb/find-workspace-by-id";
import findWorkflowVersionById from "./data/mongodb/find-workflow-version-by-id";
import findSessionByToken from "./data/mongodb/find-session-by-token";

export function getWorkflowVersionEntry ({
    workflowVersionId,
}) {
    return getWorkflowVersion({
        workflowVersionId,
        findWorkflowVersionById,
    });
}

export function getWorkflowEntry ({
    workflowId,
}) {
    return getWorkflow({
        workflowId,
        findWorkflowById,
    });
}

export function getWorkspaceEntry ({
    workspaceId,
}) {
    return getWorkspace({
        workspaceId,
        findWorkspaceById,
    });
}

export function validateSessionEntry ({
    sessionToken,
}) {
    return validateSession({
        sessionToken,
        findSessionByToken,
    });
}