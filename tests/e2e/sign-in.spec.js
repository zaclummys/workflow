// const { test, expect } = require('@playwright/test');
// const { default: signIn } = require('./sign-in');

import {test, expect} from '@playwright/test';
import signIn from './sign-in';

test('sign in', async ({ page }) => {
    await signIn(page);
    
    await page.waitForURL('/');

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