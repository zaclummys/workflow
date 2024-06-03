'use client';

import { useState } from 'react';

import { OutlineButton } from '~/components/button';

import {
    Modal,
    ModalTitle,
    ModalFooter,
} from '../modal';

export default function ManageMembersModalButton () {
    const [isOpen, setIsOpen] = useState(false);

    const onManageMembersButtonClick = () => {
        setIsOpen(true);
    };

    const onCloseButtonClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <OutlineButton
                onClick={onManageMembersButtonClick}>
                Manage Members
            </OutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Manage Members
                    </ModalTitle>

                    <ModalFooter>
                        <OutlineButton
                            onClick={onCloseButtonClick}>
                            Close
                        </OutlineButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}