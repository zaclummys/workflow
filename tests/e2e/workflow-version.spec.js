import {test, expect} from '@playwright/test';
import signIn from './sign-in';

async function createWorkflowNewVersion (page) {
    await page.goto('https://localhost:3000/workflow/485968a4-7e17-49e9-a5ba-673de5a91b74');

    const newVersionButton = await page.getByText('New Version');

    await newVersionButton.click();

    const createNewVersionButton = await page.getByText('Create', {
        exact: true
    });

    await createNewVersionButton.click();
}

async function openWorkflowVersion (page) {
    const openWorkflowVersionButton = await page.getByText('Open');

    await openWorkflowVersionButton.click();
}

test.describe('Workflow Version', () => {
    test('Add assign element', async ({ page }) => {
        await signIn(page);
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);

        const startBottomHandle = page.locator('.react-flow__node-start .react-flow__handle.react-flow__handle-bottom');

        expect(startBottomHandle).toBeAttached();

        await startBottomHandle.click();

        const assignOption = page.getByText('Assign');

        await assignOption.click();

        const newAssignElement = page.getByText('New Assign');

        expect(newAssignElement).toBeAttached();
    });

    test('Add if element', async ({ page }) => {
        await signIn(page);
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);

        const startBottomHandle = page.locator('.react-flow__node-start .react-flow__handle.react-flow__handle-bottom');

        expect(startBottomHandle).toBeAttached();

        await startBottomHandle.click();

        const ifOption = page.getByText('If');

        await ifOption.click();

        const newIfElement = page.getByText('New If');

        expect(newIfElement).toBeAttached();
    });

    test('Remove assign element', async ({ page }) => {
        await signIn(page);

        await page.goto('/workflow-version/0f952229-d1b8-4f8e-ae16-6e84f2175685/editor');

        const node = page.locator(`.react-flow__node-assign`);
    
        await node.click();

        await page.keyboard.press('Backspace');

        await expect(node).not.toBeAttached();

        const edges = await page.locator(`.react-flow__edge`).all();
        
        expect(edges).toHaveLength(0);
    });
});