import { findWorkflowVersionIdsByWorkflowId } from '~/core/data/mongodb/workflow-version';

export default async function getWorkflowVersions ({ workflowId }) {
    const workflowVersionIds = await findWorkflowVersionIdsByWorkflowId(workflowId);

    return {
        success: true,
        workflowVersionIds,
    };
}