import { signIn } from './auth';

export async function createWorkspace (page) {
    await signIn(page);

    await page.getByText('New Workspace').click();

    await page.getByText('Name').fill('My Workspace');
    await page.getByText('Description').fill('This is my workspace');

    await page.getByText('Create', {
        exact: true,
    }).click();

    await page.waitForURL('/workspace/*');
}