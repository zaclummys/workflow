export async function insertWorkflow (workflow) {
    await database
        .collection('workflows')
        .insertOne(fromWorkflow(workflow));
}

export async function findWorkflowById (id) {
    const workflowData = await database
        .collection('workflows')
        .findOne({ id });

    if (workflowData == null) {
        return null;
    }
    
    return toWorkflow(workflowData);
}

export function fromWorkflow (workflow) {
    return {
        id: workflow.getId(),
        name: workflow.getName(),
        description: workflow.getDescription(),
        workspaceId: workflow.getWorkspaceId(),
        createdAt: workflow.getCreatedAt(),
        createdById: workflow.getCreatedById(),
    };
}

export function toWorkflow (workflowData) {
    return new Workflow(workflowData);
}