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

export default function RemoveMemberModalButton ({
    member,
    workspace,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const onRemoveMemberButtonClick = () => {
        setIsOpen(true);
    };

    const onCloseButtonClick = () => {
        setIsOpen(false);
    };

    const onConfirmButtonClick = () => {
        setIsOpen(false);
    }

    return (
        <>
            <OutlineButton
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

                    <ModalFooter>
                        <OutlineButton
                            onClick={onCloseButtonClick}>
                            Cancel
                        </OutlineButton>

                        <PrimaryButton
                            onClick={onConfirmButtonClick}>
                            Remove
                        </PrimaryButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}