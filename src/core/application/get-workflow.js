import {
    findWorkflowById, 
} from '~/core/data/mongodb/workflow';

export default async function getWorkflow ({ workflowId }) {
    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        workflow: {
            id: workflow.getId(),
            name: workflow.getName(),
            description: workflow.getDescription(),
            createdAt: workflow.getCreatedAt(),
            createdById: workflow.getCreatedById(),
            workspaceId: workflow.getWorkspaceId(),
        },
    }
}