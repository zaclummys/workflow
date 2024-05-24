import {
    findWorkflowVersionById,
    updateWorkflowVersion,
} from '~/core/data/mongodb/workflow-version';

export default async function deactivateWorkflowVersionAction ({ workflowVersionId }) {
    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    workflowVersion.deactivate();

    await updateWorkflowVersion(workflowVersion);

    return {
        success: true,
    };
}