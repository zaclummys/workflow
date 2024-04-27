import findWorkflowVersionById from "../data/mongodb/find-workflow-version-by-id";

export default async function getWorkflowVersion ({ workflowVersionId }) {
    return findWorkflowVersionById(workflowVersionId);
}