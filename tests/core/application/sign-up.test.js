import signUp from '~/core/application/sign-up';
import { findUserByEmail, deleteUserByEmail } from '~/core/data/mongodb/user';

describe('Sign up', () => {
    it('Can sign up sucessfully', async () => {
        const { success } = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(success).toBe(true);
    });    

    it('Can retrieve from database', async () => {
        await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        const user = await findUserByEmail('johndoe@acme.org');

        expect(user.getId()).toBeDefined();
        expect(user.getColor()).toBeDefined();
        expect(user.getPassword()).toBeDefined();
        
        expect(user.getName()).toBe('John Doe');
        expect(user.getEmail()).toBe('johndoe@acme.org');
    });   

    it('Already taken email', async () => {
        const signUpData = {
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        };

        const response = await signUp(signUpData);

        expect(response).toEqual({
            success: true
        });

        const responseAgain = await signUp(signUpData);

        expect(responseAgain).toEqual({
            success: false,
            message: 'The email is already being used.',
        });
    });

    afterEach(async () => {
        await deleteUserByEmail('johndoe@acme.org');
    });
});