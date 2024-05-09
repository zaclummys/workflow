import signIn from '../../src/application/sign-in';

import { User } from '../../src/domain/user';
import { insertUser, deleteUserById } from '../../src/data/mongodb/user';
import { findSessionByToken, deleteSessionByToken } from '../../src/data/mongodb/session';

describe('Sign In', async () => {
    it('Returns session token', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'returns-session-token.sign-in@test.org',
            password: '12345678',
        });

        await insertUser(user);

        const { sessionToken } = await signIn({
            email: 'returns-session-token.sign-in@test.org',
            password: '12345678',
        });

        expect(sessionToken).toBeDefined();

        await deleteSessionByToken(sessionToken);
        await deleteUserById(user.getId());
    });

    it('Stores in database', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'stores-in-database.sign-in@test.org',
            password: '12345678',
        });

        await insertUser(user);

        const { sessionToken } = await signIn({
            email: 'stores-in-database.sign-in@test.org',
            password: '12345678',
        });

        const session = await findSessionByToken(sessionToken);

        expect(session).toBeDefined();

        await deleteSessionByToken(sessionToken);
        await deleteUserById(user.getId());
    });

    it.fails('Email does not exist', async () => {
        await signIn({
            email: 'email-does-not-exist.sign-in@test.org',
            password: '12345678',
        });
    });
});