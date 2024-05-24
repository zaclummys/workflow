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

export default function WorkflowVersionModalButton () {
    const [isOpen, setIsOpen] = useState(false);

    const onDeleteButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
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
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <DestructiveButton>
                            Delete
                        </DestructiveButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}