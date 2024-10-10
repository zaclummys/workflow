'use client';

import { useState } from 'react';

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

import deleteWorkflowVersionAction from '~/actions/delete-workflow-version-action';

import useNavigation from '~/hooks/use-navigation';

export default function WorkflowVersionModalButton({ workflowVersion }) {
    const { navigateToWorkflow } = useNavigation();

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

        const { success } = await deleteWorkflowVersionAction(workflowVersion.id);

        if (success) {
            navigateToWorkflow(workflowVersion.workflow.id);
        } else {
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
                        Delete Workflow Version
                    </ModalTitle>

                    <ModalText>
                        Are you sure you want to delete this version?
                    </ModalText>

                    <ModalFooter>
                        <OutlineButton
                            disabled={isDeleting}
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <DestructiveButton
                            disabled={isDeleting}
                            onClick={onConfirmButtonClick}>
                            Delete
                        </DestructiveButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}