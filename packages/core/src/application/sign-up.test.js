import { it, describe } from "vitest";

import signUp from './sign-up';
import { expect } from "vitest";

describe('Sign up', () => {
    it('Too small password', async () => {
        const response = await signUp({
            name: 'John Doe',
            email: '123@abc.xyz',
            password: '123',
        });

        expect(response).toBe({
            success: false,
            message: 'Password must contain at least 8 characters'
        });
    });

    it('Invalid email', async () => {
        const response = await signUp({
            name: 'John Doe',
            email: 'not an email',
            password: '12345678',
        });

        expect(response).toBe({
            success: false,
            message: 'Invalid email',
        });
    });

    it('Already taken email', async () => {
        const response = await signUp({
            name: 'John Doe',
            email: 'already-taken@acme.com',
            password: '12345678',
        });

        expect(response).toBe({
            success: false,
            message: 'The email is already being used',
        });
    });

    it('All correct', async () => {
        const response = await signUp({
            name: 'John Doe',
            email: '123@abc.xyz',
            password: '12345678',
        });

        expect(response).toBe({
            success: true
        });
    })
});