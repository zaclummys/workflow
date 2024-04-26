export default async function getWorkflowVersion ({
    workflowVersionId,
    findWorkflowVersionById,
}) {
    return findWorkflowVersionById(workflowVersionId);
}