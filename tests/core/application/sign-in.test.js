import signUp from '~/core/application/sign-up';
import signIn from '~/core/application/sign-in';

describe('Sign In', async () => {
    it('Can sign in successfully', async () => {    
        const signUpOutput = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(signUpOutput).toStrictEqual({
            success: true,
            userId: expect.any(String),
        });

        const signInOutput  = await signIn({
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(signInOutput).toStrictEqual({
            success: true,
            sessionToken: expect.any(String),
        });
    });

    it('Cannot sign in if email is not registered', async () => {
        const signInOutput = await signIn({
            email: 'this-email-is-not-registered@acme.org',
            password: '12345678',
        });

        expect(signInOutput).toStrictEqual({
            success: false,
            message: 'The email is not registered.',
        });
    });

    it('Cannot sign in if password is incorrect', async () => {   
        const signUpOutput = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(signUpOutput).toStrictEqual({
            success: true,
            userId: expect.any(String),
        });

        const signInOutput = await signIn({
            email: 'johndoe@acme.org',
            password: 'this-is-not-the-password',
        });

        expect(signInOutput).toStrictEqual({
            success: false,
            message: 'The password is not correct.',
        });
    });
});