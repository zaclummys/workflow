import signUp from '~/core/application/sign-up';

describe('Sign up', () => {
    it('Can sign up sucessfully', async () => {
        const signUpOutput = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(signUpOutput).toStrictEqual({
            success: true,
            userId: expect.any(String),
        });
    });    

    it('Already taken email', async () => {
        const firstSignUpOutput = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(firstSignUpOutput).toEqual({
            success: true,
            userId: expect.any(String),
        });

        const secondSignUpOutput = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(secondSignUpOutput).toEqual({
            success: false,
            message: 'The email is already being used.',
        });
    });
});