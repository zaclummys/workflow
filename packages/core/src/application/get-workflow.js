export default async function getWorkflow ({
    workflowId,
    findWorkflowById,
}) {
    return findWorkflowById(workflowId);
}