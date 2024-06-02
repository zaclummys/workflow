import {
    findWorkflowIdsByWorkspaceId, 
} from '~/core/data/mongodb/workflow';

export default async function getWorkflows ({ workspaceId }) {
    const workflowIds = await findWorkflowIdsByWorkspaceId(workspaceId);

    return {
        success: true,
        workflowIds,
    };
}