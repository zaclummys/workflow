import { findWorkflowById, deleteWorkflowById } from '~/core/data/mongodb/workflow';
import { findWorkflowVersionsByWorkflowId } from '~/core/data/mongodb/workflow-version';

export default async function deleteWorkflow ({ workflowId }) {
    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
        };
    }

    const workflowVersions = await findWorkflowVersionsByWorkflowId(workflowId);

    if (workflowVersions.length > 0) {
        return {
            success: false,
        };
    }

    await deleteWorkflowById(workflowId);

    return {
        success: true,
    };
}