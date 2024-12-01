'use client';

import {
    useState,
} from 'react';

import {
    OutlineButton,
} from '~/components/button';

import useNavigation from '~/hooks/use-navigation';

import executeWorkflowVersionAction from '~/actions/execute-workflow-version-action';
import ExecuteWorkflowVersionModal from '~/components/modals/execute-workflow-version-modal';


export default function ExecuteWorkflowVersionModalButton({
    workflowVersion,
}) {
    const [opened, setOpened] = useState(false);
    const [executing, setExecuting] = useState(false);

    const { navigateToWorkflowExecution } = useNavigation();

    const handleExecuteButtonClick = () => {
        setOpened(true);
    };

    const handleCancel = () => {
        setOpened(false);
    };

    const handleConfirm = async (inputs) => {
        setExecuting(true);

        try {
            const { success, workflowExecutionId } = await executeWorkflowVersionAction({
                inputs,
                workflowVersionId: workflowVersion.id,
            });

            if (success && workflowExecutionId) {
                navigateToWorkflowExecution(workflowExecutionId);
            } else {
                setExecuting(false);
            }
        } catch {
            setExecuting(false);
        }
    }

    return (
        <>
            {workflowVersion.status === 'active' ? (
                <OutlineButton
                    onClick={handleExecuteButtonClick}>
                    Execute
                </OutlineButton>
            ) : (
                <OutlineButton
                    disabled>
                    Execute
                </OutlineButton>
            )}

            {opened && (
                <ExecuteWorkflowVersionModal
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    executing={executing}
                    workflowVersion={workflowVersion}
                />
            )}
        </>
    );
}