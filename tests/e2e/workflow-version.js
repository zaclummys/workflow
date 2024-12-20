import { expect } from '@playwright/test';

import { createWorkflow } from './workflow';

export async function createWorkflowNewVersion (page) {
    await createWorkflow(page);

    const newVersionButton = await page.getByText('New Version');

    await newVersionButton.click();

    const createNewVersionButton = await page.getByText('Create', {
        exact: true
    });

    await createNewVersionButton.click();
}

export async function openWorkflowVersion (page) {
    const openWorkflowVersionButton = await page.getByText('Open');

    await openWorkflowVersionButton.click();
}

export async function addAssignNodeToStart (page) {
    const startBottomHandle = page.locator('.react-flow__node-start .react-flow__handle.react-flow__handle-bottom');

    await startBottomHandle.click();

    const assignOption = page.getByText('Assign');

    await assignOption.click();

    const assignNode = page.getByText('New Assign');

    await expect(assignNode).toBeAttached();

    return assignNode;
}

export async function addIfNodeToStart (page) {
    const startBottomHandle = page.locator('.react-flow__node-start .react-flow__handle-bottom');

    await startBottomHandle.click();

    const ifOption = page.getByText('If');

    await ifOption.click();

    const ifNode = page.getByText('New If');

    await expect(ifNode).toBeAttached();

    return ifNode;
}

export async function deleteNode (page, node) {
    await expect(node).toBeAttached();

    await node.click();

    await page.keyboard.press('Backspace');

    await expect(node).not.toBeAttached();

    const edges = await page.locator(`.react-flow__edge`).all();
    
    expect(edges).toHaveLength(0);
}