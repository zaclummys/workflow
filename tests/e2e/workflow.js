import { createWorkspace } from './workspace';

export async function createWorkflow (page) {
    await createWorkspace(page);

    await page.getByText('New Workflow').click();

    await page.getByLabel('Name').fill('My Workflow');
    await page.getByLabel('Description').fill('This is my workflow');

    await page.getByText('Create', {
        exact: true,
    }).click();

    await page.waitForURL('/workflow/*');
}