import { afterEach } from 'vitest';
import signUp from '../../src/application/sign-up';

import { drop } from '../../src/data/mongodb/client';

describe('Sign up', () => {
    it('All good', async () => {
        const response = await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        expect(response).toEqual({
            success: true
        });
    });

    it.fails('Already taken email', async () => {
        await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });

        await signUp({
            name: 'John Doe',
            email: 'johndoe@acme.org',
            password: '12345678',
        });
    });

    afterEach(async () => {
        await drop();
    });
});