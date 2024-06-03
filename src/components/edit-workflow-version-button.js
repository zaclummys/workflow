'use client';

import useNavigation from '~/hooks/use-navigation';
import { PrimaryButton } from '~/components/button';

export default function EditWorkflowVersionButton ({ workflowVersionId }) {
    const { navigateToEditWorkflowVersion } = useNavigation();
    
    return (
        <PrimaryButton
            onClick={() => navigateToEditWorkflowVersion(workflowVersionId)}>
            Open
        </PrimaryButton>
    );
}