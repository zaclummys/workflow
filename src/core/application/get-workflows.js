import {
    findWorkflowsByWorkspaceId, 
} from '~/core/data/mongodb/workflow';

export default async function getWorkflows ({ workspaceId }) {
    const workflows = await findWorkflowsByWorkspaceId(workspaceId);

    return {
        success: true,
        workflows: workflows.map(workflow => ({
            id: workflow.getId(),
            name: workflow.getName(),
            description: workflow.getDescription(),
        })),
    };
}