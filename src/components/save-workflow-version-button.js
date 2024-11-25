'use client';

import { useState } from 'react';
import saveWorkflowVersionAction from '~/actions/save-workflow-version-action';

import { OutlineButton } from './button';

export default function SaveWorkflowVersionButton ({
    disabled,
    workflowVersion,
}) {
    const [saving, setSaving] = useState(false);

    const handleSaveButtonClick = async () => {
        setSaving(true);

        try {
            await saveWorkflowVersionAction({
                workflowVersionId: workflowVersion.id,
                workflowVersionChanges: {
                    elements: workflowVersion.elements,
                    variables: workflowVersion.variables,
                }
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <OutlineButton
            disabled={disabled || saving}
            onClick={handleSaveButtonClick}
        >
            {saving ? 'Saving' : 'Save'}
        </OutlineButton>
    );
}