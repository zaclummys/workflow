import {test, expect} from '@playwright/test';
import signIn from './sign-in';

async function createWorkflow (page) {
    await page.goto('https://localhost:3000/workflow/485968a4-7e17-49e9-a5ba-673de5a91b74');
}

async function createWorkflowNewVersion (page) {
    await createWorkflow(page);

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

async function addAssignNodeToStart (page) {
    const startBottomHandle = page.locator('.react-flow__node-start .react-flow__handle.react-flow__handle-bottom');

    await startBottomHandle.click();

    const assignOption = page.getByText('Assign');

    await assignOption.click();

    const assignNode = page.getByText('New Assign');

    expect(assignNode).toBeAttached();

    return assignNode;
}

async function addIfNodeToStart (page) {
    const startBottomHandle = page.locator('.react-flow__node-start .react-flow__handle.react-flow__handle-bottom');

    await startBottomHandle.click();

    const ifOption = page.getByText('Assign');

    await ifOption.click();

    const ifNode = page.getByText('New Assign');

    expect(ifNode).toBeAttached();

    return ifNode;
}

async function deleteNode (page, node) {
    await expect(node).toBeAttached();

    await node.click();

    await page.keyboard.press('Backspace');

    await expect(node).not.toBeAttached();

    const edges = await page.locator(`.react-flow__edge`).all();
    
    expect(edges).toHaveLength(0);
}

test.describe('Workflow Version', () => {
    test('Add assign element', async ({ page }) => {
        await signIn(page);
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        await addAssignNodeToStart(page);
    });

    test('Add if element', async ({ page }) => {
        await signIn(page);
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        await addIfNodeToStart(page);
    });

    test('Remove assign element', async ({ page }) => {
        await signIn(page);
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        
        const assignNode = await addAssignNodeToStart(page);
    
        await deleteNode(page, assignNode);
    });

    test('Remove if element', async ({ page }) => {
        await signIn(page);
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        
        const ifNode = await addIfNodeToStart(page);
    
        await deleteNode(page, ifNode);
    });
});