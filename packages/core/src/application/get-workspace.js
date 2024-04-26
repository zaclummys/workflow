export default async function getWorkspace ({
    workspaceId,
    findWorkspaceById,
}) {
    return findWorkspaceById(workspaceId);
}