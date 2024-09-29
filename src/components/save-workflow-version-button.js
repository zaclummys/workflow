'use client';

import { useState } from 'react';
import saveWorkflowVersionAction from '~/actions/save-workflow-version-action';

import { OutlineButton } from './button';

export default function SaveWorkflowVersionButton ({
    localWorkflowVersion,
    hasLocalWorkflowVersionChanged,
}) {
    const [pending, setPending] = useState(false);

    const handleSaveButtonClick = async (event) => {
        setPending(true);

        try {
            await saveWorkflowVersionAction({
                workflowVersionId: localWorkflowVersion.id,
                workflowVersionChanges: {
                    elements: localWorkflowVersion.elements,
                    variables: localWorkflowVersion.variables,
                }
            });
        } finally {
            setPending(false);
        }
    };

    return (
        <OutlineButton
            disabled={!hasLocalWorkflowVersionChanged || pending}
            onClick={handleSaveButtonClick}
        >
            Save
        </OutlineButton>
    );
}