import { UserPassword, UserColor } from '~/core/domain/user';

function createGoodPassword() {
    return UserPassword.create('12345678');
}

function createTooSmallPassword() {
    return UserPassword.create('123');
}

function createTooBigPassword() {
    return UserPassword.create('*'.repeat(256));
}

describe('User', () => {
    describe('User password', () => {
        it.fails('Too small password', async () => {
            await createTooSmallPassword();
        });
    
        it.fails('Too big password', async () => {
            await createTooBigPassword();
        });
    
        it('Hash password', async () => {
            const password = await createGoodPassword();
    
            expect(password.toString()).not.toBe('12345678');
        });

        it('Hash password with argon2', async () => {
            const password = await createGoodPassword();
    
            expect(password.toString().startsWith('$argon2id$')).toBe(true);
        });
    
        it('Correct password', async () => {
            const password = await createGoodPassword();

            expect(password.verify('12345678')).resolves.toBeTruthy()
        });

        it('Incorrect password', async () => {
            const password = await createGoodPassword();

            expect(password.verify('87654321')).resolves.toBeFalsy();
        });
    });

    describe('User color', () => {
        it('Generate all colors', () => {
            const colors = UserColor.colors;

            for (const color of colors) {
                const userColor = UserColor.create();

                if (color === userColor.getName()) {
                    break;
                }
            }            
        });
    })
});