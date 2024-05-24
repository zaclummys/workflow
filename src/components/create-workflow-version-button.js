'use client';

import { useState } from 'react';
import useNavigation from '~/hooks/use-navigation';
import { PrimaryButton } from '~/components/button';
import createWorkflowVersionAction from '~/actions/create-workflow-version-action';

export default function createWorkflowVersionButton ({ workflowId }) {
    const { navigateToWorkflowVersion } = useNavigation();

    const [pending, setPending] = useState(false);

    const onButtonClick = async () => {
        setPending(true);

        try {
            const { success, message, workflowVersionId } = await createWorkflowVersionAction(workflowId);

            if (success) {
                navigateToWorkflowVersion(workflowVersionId);
            } else {
                alert(message);
            }
        } finally {
            setPending(false);
        }
    };

    if (!workflowId) {
        return null;
    }

    return (
        <PrimaryButton
            disabled={pending}
            onClick={onButtonClick}>
            New Workflow Version
        </PrimaryButton>
    );
}