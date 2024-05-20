
import {
    findWorkflowsByWorkspaceId, 
} from '~/core/data/mongodb/workflow';
import canAccessWorkspace from '~/core/authorization/can-access-workspace';

export default async function getWorkflows ({
    workspaceId,
    sessionToken,
}) {
    const canCurrentUserAccessWorkspace = await canAccessWorkspace({
        workspaceId,
        sessionToken,
    });

    if (!canCurrentUserAccessWorkspace) {
        return {
            success: false,
        };
    }

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