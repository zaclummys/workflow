const { test, expect } = require('@playwright/test');

test('sign in', async ({ page }) => {
    await page.goto('https://localhost:3000/sign-in');

    await page.getByTestId('sign-in-email-field').fill('isaac@gmail.com');
    await page.getByTestId('sign-in-password-field').fill('12345678');
    
    await page.getByTestId('sign-in-submit-button').click();
    
    await page.waitForURL({
        url: 'https://localhost:3000'
    });

    const cookies = await page.context().cookies();
    
    expect(cookies).toStrictEqual(expect.arrayContaining([{
        domain: "localhost",
        expires: -1,
        httpOnly: true,
        name: "session_token",
        path: "/",
        sameSite: "Strict",
        secure: true,
        value: expect.any(String),
    }]))
});