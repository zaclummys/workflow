export default async function signIn (page) {
    await page.goto('/sign-in');

    await page.getByTestId('sign-in-email-field').fill('isaac@gmail.com');
    await page.getByTestId('sign-in-password-field').fill('12345678');
    
    await page.getByTestId('sign-in-submit-button').click();
    
    await page.waitForURL('/');
}
