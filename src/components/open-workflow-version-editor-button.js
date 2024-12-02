'use client';

import useNavigation from '~/hooks/use-navigation';
import { PrimaryButton } from '~/components/button';

export default function OpenWorkflowVersionEditorButton ({ workflowVersionId }) {
    const { openWorkflowVersionEditor } = useNavigation();
    
    return (
        <PrimaryButton
            onClick={() => openWorkflowVersionEditor(workflowVersionId)}>
            Open
        </PrimaryButton>
    );
}