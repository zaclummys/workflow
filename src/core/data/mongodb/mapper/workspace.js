export function fromWorkspace (workspace) {
    return {
        id: workspace.getId(),
        name: workspace.getName(),
        description: workspace.getDescription(),
        createdAt: workspace.getCreatedAt(),
        updatedAt: workspace.getUpdatedAt(),
    };
}

export function toWorkspace (workspaceData) {
    return new Workspace({
        id: new WorkspaceId(workspaceData.id),
        name: workspaceData.name,
        description: workspaceData.description,
        createdAt: workspaceData.createdAt,
        updatedAt: workspaceData.updatedAt,
    });
}