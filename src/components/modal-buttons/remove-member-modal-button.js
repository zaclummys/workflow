'use client';

import { useState } from 'react';

import {
    OutlineButton,
    PrimaryButton,
} from '~/components/button';

import {
    Modal,
    ModalTitle,
    ModalFooter,
} from '~/components/modal';

import Error from '~/components/error';

import removeMemberFromWorkspaceAction from '~/actions/remove-member-from-workspace-action';

export default function RemoveMemberModalButton ({
    member,
    workspace,
    disabled,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const [isRemoving, setIsRemoving] = useState(false);
    const [error, setError] = useState(null);

    const onRemoveMemberButtonClick = () => {
        setIsOpen(true);
    };

    const onCloseButtonClick = () => {
        setIsOpen(false);
    };

    const onConfirmButtonClick = async () => {
        setIsRemoving(true);
        setError(null);

        const { success, message } = await removeMemberFromWorkspaceAction({
            userId: member.user.id,
            workspaceId: workspace.id,
        });

        if (success) {
            setIsOpen(false);
        } else {
            setError(message);
            setIsRemoving(false);
        }
    }

    return (
        <>
            <OutlineButton
                disabled={disabled}
                onClick={onRemoveMemberButtonClick}>
                Remove
            </OutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Remove Member
                    </ModalTitle>

                    <span>
                        Are you sure you want to remove <span className="font-medium">{member.user.name}</span> from {workspace.name}?
                    </span>

                    {error && (
                        <Error>
                            {error}
                        </Error>
                    )}

                    <ModalFooter>
                        <OutlineButton
                            disabled={isRemoving}
                            onClick={onCloseButtonClick}>
                            Cancel
                        </OutlineButton>

                        <PrimaryButton
                            disabled={isRemoving}
                            onClick={onConfirmButtonClick}>
                            Remove
                        </PrimaryButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}