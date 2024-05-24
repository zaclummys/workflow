'use client';

import {
    useState, 
} from 'react';

import {
    Modal,
    ModalTitle,
    ModalFooter, 
} from '~/components/modal';

import {
    OutlineButton,
    DestructiveButton, 
} from '~/components/button';

import Error from '~/components/error';

import deleteWorkspaceAction from '~/actions/delete-workspace-action';

import useNavigation from '~/hooks/use-navigation';

export default function DeleteWorkspaceModalButton({ workspace }) {
    const { navigateToHome } = useNavigation();

    const [isOpen, setIsOpen] = useState(false);

    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const onDeleteButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onConfirmButtonClick = async () => {
        setPending(true);

        try {
            const { success, message } = await deleteWorkspaceAction(workspace.id);

            if (success) {
                navigateToHome();
            } else {
                setError(message);
            }
        } finally {
            setPending(false);
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
                        Delete Workspace
                    </ModalTitle>

                    <span>Are you sure you want to delete {workspace.name}?</span>

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