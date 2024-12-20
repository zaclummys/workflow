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
    ModalFooter, 
} from '~/components/modal';

import deleteWorkspaceAction from '~/actions/delete-workspace-action';

import useNavigation from '~/hooks/use-navigation';

export default function DeleteWorkspaceModalButton({
    workspace,
}) {
    const { navigateToHome } = useNavigation();

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
            const { success } = await deleteWorkspaceAction(workspace.id);

            if (success) {
                navigateToHome();
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
                        Delete Workspace
                    </ModalTitle>

                    <span>
                        Are you sure you want to delete <span className="font-medium">{workspace.name}</span>?
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