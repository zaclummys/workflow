import signUp from '../../src/application/sign-up';
import { deleteUserById } from '../../src/data/mongodb/user';

describe('Sign up', () => {
    it('All good', async () => {
        const { userId } = await signUp({
            name: 'John Doe',
            email: 'all-good.sign-up@test.org',
            password: '12345678',
        });

        expect(userId).toBeDefined();

        await deleteUserById(userId);
    });

    it.fails('Already taken email', async () => {
        const { userId } = await signUp({
            name: 'John Doe',
            email: 'already-taken-email.sign-up@test.org',
            password: '12345678',
        });

        try {
            await signUp({
                name: 'John Doe',
                email: 'already-taken-email.sign-up@test.org',
                password: '12345678',
            });
        } finally {
            await deleteUserById(userId);
        }
    });
});