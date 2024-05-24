export default async function canAccessWorkflowVersion ({
    workflowVersionId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return false;
    }

    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return false;
    }

    const workflow = await findWorkflowById(workflowVersion.getWorkflowId());

    if (!workflow) {
        return false;
    }

    const workspace = await findWorkspaceById(workflow.getWorkspaceId());

    if (!workspace) {
        return false;
    }

    if (!workspace.isMember(session.getUserId())) {
        return false;
    }
    
    return true;
}