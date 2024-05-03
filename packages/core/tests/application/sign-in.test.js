import { User } from '../../src/domain/user';
import signIn from '../../src/application/sign-in';
import { insertUser } from '../../src/data/mongodb/user';

describe('Sign In', () => {
    it('All good', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        await insertUser(user);

        await signIn({
            email: 'johndoe@acme.org',
            password: '12345678',
        });
    });
});