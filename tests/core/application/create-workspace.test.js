import signUp from '~/core/application/sign-up';
import signIn from '~/core/application/sign-in';
import createWorkspace from '~/core/application/create-workspace.js';

describe('Create Workspace', async () => {
    it('Create a workspace successfully', async () => {
        const { userId } = await signUp({
            name: 'John Doe (CW)',
            email: 'johndoe@acme.org',
            password: '12345678',
        });
    
        const { sessionToken } = await signIn({
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        const createWorkspaceOutput = await createWorkspace({
            name: 'Workspace 1',
            description: 'This is a very cool workspace.',
            sessionToken,
        });

        expect(createWorkspaceOutput).toStrictEqual({
            success: true,
            workspaceId: expect.any(String),
        });
    });
});