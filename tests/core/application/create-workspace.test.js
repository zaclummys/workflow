import { insertUser, deleteUserById } from '~/core/data/mongodb/user.js';
import { insertSession, deleteSessionById } from '~/core/data/mongodb/session.js';
import { findWorkspaceById, deleteWorkspaceById } from '~/core/data/mongodb/workspace.js';

import { User } from '~/core/domain/user.js';
import { Session } from '~/core/domain/session.js';

import createWorkspace from '~/core/application/create-workspace.js';

describe('Create Workspace', async () => {
    const user = await User.create({
        name: 'John Doe',
        email: 'johndoe@acme.org',
        password: '12345678',
    });

    const session = Session.create({
        userId: user.getId(),
    });

    beforeAll(async () => {
        await insertUser(user);
        await insertSession(session);
    });

    it('Create a workspace successfully', async () => {
        const { success, workspaceId } = await createWorkspace({
            name: 'Workspace 1',
            description: 'This is a very cool workspace.',
            sessionToken: session.getToken(),
        });

        expect(success).toBe(true);

        await deleteWorkspaceById(workspaceId);
    });

    it('Stores in database', async () => {
        const { workspaceId } = await createWorkspace({
            name: 'Workspace 1',
            description: 'This is a very cool workspace.',
            sessionToken: session.getToken(),
        });
        
        const workspace = await findWorkspaceById(workspaceId);

        expect(workspace.getId()).toBe(workspaceId);
        expect(workspace.getName()).toBe('Workspace 1');
        expect(workspace.getDescription()).toBe('This is a very cool workspace.');
        expect(workspace.getCreatedAt()).toBeInstanceOf(Date);
        expect(workspace.getCreatedById()).toBe(user.getId());

        await deleteWorkspaceById(workspaceId);
    });

    afterAll(async () => {
        await deleteSessionById(session.getId());
        await deleteUserById(user.getId());
    });
});