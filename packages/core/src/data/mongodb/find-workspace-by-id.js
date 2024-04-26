export default async function findWorkspaceById ({ workspaceId }) {
    return {
        id: workspaceId,
        name: 'Workspace ABC',
    };
}