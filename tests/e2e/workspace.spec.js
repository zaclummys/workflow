import { test, expect } from '@playwright/test';

import { createWorkspace } from './workspace';

test('Create workspace', async ({ page }) => {
    await createWorkspace(page);

    const title = page.getByText('My Workspace', {
        exact: true,
    });
    
    const description = page.getByText('This is my workspace', {
        exact: true,
    });

    await expect(title).toBeAttached();
    await expect(description).toBeAttached();
});