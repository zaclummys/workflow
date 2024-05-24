'use client';

import { useState } from 'react';

import {
    OutlineButton,
    DestructiveButton,
} from '~/components/button';

import {
    Modal,
    ModalTitle,
    ModalFooter,
} from './modal';

export default function EditWorkflowModalButton () {
    const [isOpen, setIsOpen] = useState(false);

    const onEditButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onDeleteButtonClick = () => {
        setIsOpen(true);
    };

    return (
        <>
            <OutlineButton
                onClick={onEditButtonClick}>
                Edit
            </OutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Edit Workflow
                    </ModalTitle>

                    <ModalFooter>
                        <OutlineButton
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <DestructiveButton
                            onClick={onDeleteButtonClick}>
                            Delete
                        </DestructiveButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}