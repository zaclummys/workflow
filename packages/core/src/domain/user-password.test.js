import { it } from "vitest";
import { describe } from "vitest";

import UserPassword from './user-password';
import { expect } from "vitest";

describe('User password', () => {
    it('Hash password', async () => {
        const password = await UserPassword.hash('12345678');

        expect(password).instanceOf(UserPassword);
    });

    describe('Verify password', async () => {
        const password = await UserPassword.hash('12345678');

        it('Correct password', async () => {           
            const verification = await password.verify('12345678');

            expect(verification).toBeTruthy();
        });

        it('Incorrect password', async () => {
            const verification = await password.verify('87654321');

            expect(verification).toBeFalsy();
        });
    });
});