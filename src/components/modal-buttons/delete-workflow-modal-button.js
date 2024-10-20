'use client';

import {
    useState,
} from 'react';

import {
    OutlineButton,
    DestructiveButton,
} from '~/components/button';

import {
    Modal,
    ModalTitle,
    ModalText,
    ModalFooter,
} from '~/components/modal';

import deleteWorkflowAction from '~/actions/delete-workflow-action';

import useNavigation from '~/hooks/use-navigation';

export default function DeleteWorkflowModalButton({
    workflow,
}) {
    const { navigateToWorkspace } = useNavigation();

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const onDeleteButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onConfirmButtonClick = async () => {
        setIsDeleting(true);

        try {
            const { success } = await deleteWorkflowAction(workflow.id);

            if (success) {
                navigateToWorkspace(workflow.workspace.id);
            } else {
                setIsDeleting(false);
            }
        } catch {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <OutlineButton
                onClick={onDeleteButtonClick}>
                Delete
            </OutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Delete Workflow
                    </ModalTitle>

                    <span>
                        Are you sure you want to delete <span className="font-medium">{workflow.name}</span>?
                    </span>

                    <ModalFooter>
                        <OutlineButton
                            disabled={isDeleting}
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <DestructiveButton
                            disabled={isDeleting}
                            onClick={onConfirmButtonClick}>
                            Confirm
                        </DestructiveButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}