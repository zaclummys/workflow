import findWorkflowById from "../data/mongodb/find-workflow-by-id";

export default async function getWorkflow ({ workflowId }) {
    return findWorkflowById(workflowId);
}