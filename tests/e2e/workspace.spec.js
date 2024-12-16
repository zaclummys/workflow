import { test, expect } from '@playwright/test';

import signIn from './sign-in';

test('Should be able to create a new workspace', async ({ page }) => {
    await signIn(page);

    await page.getByText('New Workspace').click();

    await page.getByText('Name').fill('My Workspace');
    await page.getByText('Description').fill('This is my workspace');

    await page.getByText('Create', {
        exact: true,
    }).click();

    await page.waitForURL('/workspace/*');

    const title = page.getByText('My Workspace', {
        exact: true,
    });
    
    const description = page.getByText('This is my workspace', {
        exact: true,
    });

    await expect(title).toBeAttached();
    await expect(description).toBeAttached();
});