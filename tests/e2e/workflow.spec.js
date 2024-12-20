import { test, expect } from '@playwright/test';

import { createWorkflow } from './workflow';

test.describe('Workflow', () => {
    test('Create Workflow', async ({ page }) => {
        await createWorkflow(page);

        const title = page.getByText('My Workflow', {
            exact: true,
        });

        const description = page.getByText('This is my workflow', {
            exact: true,
        });

        await expect(title).toBeAttached();
        await expect(description).toBeAttached();
    });
});