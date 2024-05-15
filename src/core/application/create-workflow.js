import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkspaceById } from '~/core/data/mongodb/workspace';
import { insertWorkflow } from '~/core/data/mongodb/workflow';
import { Workflow } from '~/core/domain/workflow';

export default async function createWorkflow ({
    name,
    description,
    workspaceId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        return {
            success: false,
            message: 'Workspace not found.'
        };
    }
    
    if (!workspace.belongsTo(session.getUserId())) {
        return {
            success: false,
            message: 'User does not belong to the workspace.'
        };
    }

    const workflow = Workflow.create({
        name,
        description,
        createdById: session.getUserId(),
        workspace: workspace.getId(),
    });

    await insertWorkflow(workflow);

    return {
        success: true,
        workflowId: workflow.getId(),
    };
}