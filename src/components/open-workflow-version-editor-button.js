'use client';

import useNavigation from '~/hooks/use-navigation';
import { PrimaryButton } from '~/components/button';

export default function OpenWorkflowVersionEditorButton ({ workflowVersionId }) {
    const { navigateToWorkflowVersionEditor } = useNavigation();
    
    return (
        <PrimaryButton
            onClick={() => navigateToWorkflowVersionEditor(workflowVersionId)}>
            Open
        </PrimaryButton>
    );
}