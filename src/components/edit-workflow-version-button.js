'use client';

import useNavigation from '~/hooks/use-navigation';
import { PrimaryButton } from '~/components/button';

export default function EditWorkflowVersionButton ({ workflowVersionId }) {
    const { navigateToEditWorkflowVersion } = useNavigation();

    const onButtonClick = () => {
        navigateToEditWorkflowVersion(workflowVersionId);
    };

    return (
        <PrimaryButton
            onClick={onButtonClick}>
            Open
        </PrimaryButton>
    );
}