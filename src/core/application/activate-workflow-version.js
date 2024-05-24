import {
    findWorkflowVersionById,
    updateWorkflowVersion,
} from '~/core/data/mongodb/workflow-version';

export default async function activateWorkflowVersionAction ({ workflowVersionId }) {
    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    workflowVersion.activate();

    await updateWorkflowVersion(workflowVersion);

    return {
        success: true,
    };
}