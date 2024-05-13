import signIn from '~/core/application/sign-in';

import { User } from '~/core/domain/user';
import { insertUser, deleteUserById } from '~/core/data/mongodb/user';
import { findSessionByToken, deleteSessionByToken } from '~/core/data/mongodb/session';

describe('Sign In', async () => {
    const user = await User.create({
        name: 'John Doe',
        email: 'johndoe@acme.org',
        password: '12345678',
    });

    beforeAll(async () => {
        await insertUser(user);
    });

    it('Can sign in successfully', async () => {    
        const { success, sessionToken } = await signIn({
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(success).toBe(true);

        await deleteSessionByToken(sessionToken);
    });

    it('Can retrieve from database', async () => {
        const { sessionToken } = await signIn({
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        const session = await findSessionByToken(sessionToken);

        expect(session.getId()).not.toBeNull();
        expect(session.getToken()).toBe(sessionToken);
        expect(session.getUserId()).toBe(user.getId());

        await deleteSessionByToken(sessionToken);
    });

    it('Cannot sign in if email is not registered', async () => {
        const response = await signIn({
            email: 'this-email-is-not-registered@acme.org',
            password: '12345678',
        });

        expect(response).toEqual({
            success: false,
            message: 'The email is not registered.',
        });
    });

    it('Cannot sign in if password is incorrect', async () => {    
        const response = await signIn({
            email: 'johndoe@acme.org',
            password: 'this-is-not-the-password',
        });

        expect(response).toEqual({
            success: false,
            message: 'The password is not correct.',
        });
    });

    afterAll(async () => {
        await deleteUserById(user.getId());
    });
});