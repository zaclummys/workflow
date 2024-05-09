import findWorkspaceById from "../data/mongodb/find-workspace-by-id";

export default async function getWorkspace ({ workspaceId }) {
    return findWorkspaceById(workspaceId);
}