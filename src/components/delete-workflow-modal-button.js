'use client';

import { useRouter } from 'next/navigation';

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
    DestructiveOutlineButton,
    DestructiveButton, 
} from '~/components/button';

import Error from '~/components/error';

import deleteWorkflowAction from '~/actions/delete-workflow-action';

export default function DeleteWorkflowModalButton ({ workflow }) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const navigateToWorkspace = () => {
        router.push(`/workspace/${workflow.workspaceId}`);
    };

    const onDeleteButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onConfirmButtonClick = async () => {
        setPending(true);

        try {
            const { success, message } = await deleteWorkflowAction(workflow.id);

            if (success) {
                navigateToWorkspace();
            } else {
                setError(message);
            }
        } finally {
            setPending(false);
        }        
    };

    return (
        <>
            <DestructiveOutlineButton
                onClick={onDeleteButtonClick}>
                Delete
            </DestructiveOutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Delete Workflow
                    </ModalTitle>

                    <ModalText>
                        Are you sure you want to delete {workflow.name}?
                    </ModalText>

                    {error && (
                        <Error>
                            {error}
                        </Error>
                    )}

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