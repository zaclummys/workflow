import { UserPassword, UserColor } from '~/core/domain/user';

describe('User', () => {
    describe('User password', () => {
        it.fails('Too small password', async () => {
            await UserPassword.create('123');
        });
    
        it.fails('Too big password', async () => {
            await UserPassword.create('*'.repeat(256));
        });

        it('Incorrect password', async () => {
            const password = await UserPassword.create('12345678');

            expect(password.toString()).not.toBe('12345678');
            await expect(password.verify('12345678')).resolves.toBeTruthy()
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