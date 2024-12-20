import { test } from '@playwright/test';

import {
    createWorkflowNewVersion,
    openWorkflowVersion,
    addAssignNodeToStart,
    addIfNodeToStart,
    deleteNode,
} from './workflow-version';


test.describe('Workflow Version', () => {
    test('Add assign element', async ({ page }) => {
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        await addAssignNodeToStart(page);
    });

    test('Add if element', async ({ page }) => {
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        await addIfNodeToStart(page);
    });

    test('Remove assign element', async ({ page }) => {
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        
        const assignNode = await addAssignNodeToStart(page);
    
        await deleteNode(page, assignNode);
    });

    test('Remove if element', async ({ page }) => {
        await createWorkflowNewVersion(page);
        await openWorkflowVersion(page);
        
        const ifNode = await addIfNodeToStart(page);
    
        await deleteNode(page, ifNode);
    });
});