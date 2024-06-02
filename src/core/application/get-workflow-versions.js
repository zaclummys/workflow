import { findWorkflowVersionsByWorkflowId } from '~/core/data/mongodb/workflow-version';

export default async function getWorkflowVersions ({ workflowId }) {
    const workflowVersions = await findWorkflowVersionsByWorkflowId(workflowId);

    return {
        success: true,
        workflowVersions: workflowVersions.map(workflowVersion => ({
            id: workflowVersion.getId(),
            number: workflowVersion.getNumber(),
            elements: workflowVersion.getElements(),
            variables: workflowVersion.getVariables(),
            status: workflowVersion.getStatus(),
            workflowId: workflowVersion.getWorkflowId(),
            createdAt: workflowVersion.getCreatedAt(),
            createdById: workflowVersion.getCreatedById(),
        })),
    };
}