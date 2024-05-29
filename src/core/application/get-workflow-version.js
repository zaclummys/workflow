import { findWorkflowVersionById } from "~/core/data/mongodb/workflow-version";

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
            variables: workflowVersion.getVariables()
                .map(variable => ({
                    id: variable.getId(),
                    name: variable.getName(),
                    type: variable.getType(),
                    description: variable.getDescription(),
                    defaultValue: variable.getDefaultValue(),
                    markedAsInputOption: variable.getMarkedAsInputOption(),
                    markedAsOutputOption: variable.getMarkedAsOutputOption(),
                })),
            workflowId: workflowVersion.getWorkflowId(),
            createdAt: workflowVersion.getCreatedAt(),
            createdById: workflowVersion.getCreatedById(),
        },
    };
}