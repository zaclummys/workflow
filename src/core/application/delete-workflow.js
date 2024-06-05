import { findWorkflowById, deleteWorkflowById } from '~/core/data/mongodb/workflow';
import { countWorkflowVersionsByWorkflowId } from '~/core/data/mongodb/workflow-version';

export default async function deleteWorkflow ({ workflowId }) {
    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
        };
    }

    const numberOfWorkflowVersions = await countWorkflowVersionsByWorkflowId(workflowId);

    if (numberOfWorkflowVersions > 0) {
        return {
            success: false,
        };
    }

    await deleteWorkflowById(workflowId);

    return {
        success: true,
    };
}