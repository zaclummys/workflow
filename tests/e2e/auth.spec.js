import { test, expect } from '@playwright/test';

import { signIn, signUp } from './auth';

test.describe('Auth', () => {
    test('Sign up', async ({ page }) => {
        await signUp(page);
    });

    test('Sign in', async ({ page }) => {
        await signIn(page);
    
        const cookies = await page.context().cookies();
        
        expect(cookies).toStrictEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "session_token",
                    value: expect.any(String),
                }),
            ]),
        );
    });
});