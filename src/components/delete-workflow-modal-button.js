'use client';

import {
    useState, 
} from 'react';

import {
    Modal,
    ModalTitle,
    ModalFooter,
    ModalText, 
} from '~/components/modal';

import {
    OutlineButton,
    DestructiveButton, 
} from '~/components/button';

import deleteWorkflowAction from '~/actions/delete-workflow-action';

import useNavigation from '~/hooks/use-navigation';

export default function DeleteWorkflowModalButton ({
    workflow,
    disabled,
}) {
    const { navigateToWorkspace } = useNavigation();

    const [isOpen, setIsOpen] = useState(false);

    const [pending, setPending] = useState(false);

    const onDeleteButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onConfirmButtonClick = async () => {
        setPending(true);

        try {
            const { success } = await deleteWorkflowAction(workflow.id);

            if (success) {
                navigateToWorkspace(workflow.workspace.id);
            }
        } finally {
            setPending(false);
        }        
    };

    return (
        <>
            {disabled ? (
                <OutlineButton disabled>
                    Delete
                </OutlineButton>
            ) : (
                <OutlineButton
                    onClick={onDeleteButtonClick}>
                    Delete
                </OutlineButton>
            )}

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Delete Workflow
                    </ModalTitle>

                    <ModalText>
                        Are you sure you want to delete <span className="font-medium">{workflow.name}</span>?
                    </ModalText>

                    <ModalFooter>
                        <OutlineButton
                            disabled={pending}
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <DestructiveButton
                            disabled={pending}
                            onClick={onConfirmButtonClick}>
                            Confirm
                        </DestructiveButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}