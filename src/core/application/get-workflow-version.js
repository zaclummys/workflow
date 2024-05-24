import { findWorkflowVersionById } from "~/core/data/mongodb/workflow-version";
import { findWorkflowById } from "~/core/data/mongodb/workflow";
import { findWorkspaceById } from "~/core/data/mongodb/workspace";
import { findSessionByToken } from "~/core/data/mongodb/session";

export default async function getWorkflowVersion ({ workflowVersionId }) {
    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
            message: 'Workflow version not found.',
        };
    }

    return {
        success: true,
        workflowVersion: {
            id: workflowVersion.getId(),
            number: workflowVersion.getNumber(),
            status: workflowVersion.getStatus(),
            workflowId: workflowVersion.getWorkflowId(),
            createdAt: workflowVersion.getCreatedAt(),
            createdById: workflowVersion.getCreatedById(),
        },
    };
}