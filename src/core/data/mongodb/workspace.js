import { connect } from './client.js';

export async function findWorkspaceById (id) {
    const connection = await connect();

    const workspace = await connection
        .collection('workspaces')
        .findOne({ id });

    if (workspace == null) {
        return null;
    }

    return 
}

export async function findWorkspacesByUserId (userId) {
    const connection = await connect();

    // find workspaces that user ID is inside of the workspace's member list
    const workspaces = await connection
        .collection('workspaces')
        .find({ members: userId })
        .toArray();
        
    return workspaces.map(workspace => ({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
    }));
}