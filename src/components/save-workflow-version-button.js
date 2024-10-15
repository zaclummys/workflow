'use client';

import { useState } from 'react';
import saveWorkflowVersionAction from '~/actions/save-workflow-version-action';

import { OutlineButton } from './button';

export default function SaveWorkflowVersionButton ({
    disabled,
    workflowVersion,
    onSave,
}) {
    const [pending, setPending] = useState(false);

    const handleSaveButtonClick = async () => {
        setPending(true);

        try {
            const { success } = await saveWorkflowVersionAction({
                workflowVersionId: workflowVersion.id,
                workflowVersionChanges: {
                    elements: workflowVersion.elements,
                    variables: workflowVersion.variables,
                }
            });

            onSave?.(success);
        } finally {
            setPending(false);
        }
    };

    return (
        <OutlineButton
            disabled={disabled || pending}
            onClick={handleSaveButtonClick}
        >
            {pending ? 'Saving' : 'Save'}
        </OutlineButton>
    );
}