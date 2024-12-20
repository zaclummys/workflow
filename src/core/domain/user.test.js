import { User, UserPassword, UserColor } from './user';

describe('User', () => {
    it('Should create a personal workspace', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndo@acme.com',
            password: '12345678',
        });

        const workspace = user.createPersonalWorkspace();

        expect(workspace.getName()).toBe("John Doe's Workspace");
        expect(workspace.getDescription()).toBe("This is your personal workspace. Create workflows and invite members.");
        expect(workspace.getCreatedById()).toBe(user.getId());
    });

    describe('User password', () => {
        it.fails('Too small password', async () => {
            await UserPassword.create('123');
        });
    
        it.fails('Too big password', async () => {
            await UserPassword.create('*'.repeat(256));
        });

        it('Does not store plain text password', async () => {
            const password = await UserPassword.create('12345678');

            expect(password.toString()).not.toBe('12345678');
        });

        it('Correct password', async () => {
            const password = await UserPassword.create('12345678');

            await expect(password.verify('12345678')).resolves.toBeTruthy()
        });

        it('Incorrect password', async () => {
            const password = await UserPassword.create('12345678');

            await expect(password.verify('87654321')).resolves.toBeFalsy();
        });
    });

    describe('User color', () => {
        it('Generate all colors', () => {
            const colors = UserColor.colors;

            for (const color of colors) {
                while (true) {
                    const userColor = UserColor.create();

                    if (color === userColor.getName()) {
                        break;
                    }
                }                
            }            
        });
    })
});