import { findWorkflowById, deleteWorkflowById } from '~/core/data/mongodb/workflow';

export default async function deleteWorkflow ({ workflowId }) {
    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return {
            success: false,
            message: 'Workflow not found.',
        };
    }

    await deleteWorkflowById(workflowId);

    return {
        success: true,
    };
}