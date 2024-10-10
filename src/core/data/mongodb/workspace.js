import {
    Workspace, WorkspaceMember, 
} from '../../domain/workspace.js';

import database from './database';

export async function insertWorkspace (workspace) {
    await database
        .collection('workspaces')
        .insertOne(fromWorkspace(workspace));
}

export async function findWorkspaceById (id) {
    const workspace = await database
        .collection('workspaces')
        .findOne({ id });

    if (workspace == null) {
        return null;
    }

    return toWorkspace(workspace);
}

export async function findWorkspaceIdsByUserId (userId) {
    const workspaceIdsData = await database
        .collection('workspaces')
        .find({
            'members.userId': userId, 
        })
        .toArray();

    return workspaceIdsData.map(workspaceIdData => workspaceIdData.id);
}

export async function updateWorkspace (workspace) {
    await database
        .collection('workspaces')
        .updateOne({
            id: workspace.getId(), 
        }, {
            $set: fromWorkspace(workspace),
        });
}

export async function deleteWorkspaceById (id) {
    await database
        .collection('workspaces')
        .deleteOne({ id });
}

export function fromWorkspace (workspace) {
    return {
        id: workspace.getId(),
        name: workspace.getName(),
        description: workspace.getDescription(),
        createdAt: workspace.getCreatedAt(),
        createdById: workspace.getCreatedById(),
        members: workspace.getMembers()
            .map(member => ({
                userId: member.getUserId(),
                addedAt: member.getAddedAt(),
            })),
    };
}

export function toWorkspace (workspaceData) {
    return new Workspace({
        id: workspaceData.id,
        name: workspaceData.name,
        description: workspaceData.description,
        createdAt: workspaceData.createdAt,
        createdById: workspaceData.createdById,
        members: workspaceData.members
            .map(memberData => new WorkspaceMember({
                userId: memberData.userId,
                addedAt: memberData.addedAt,
            })),
    });
}