'use client';

import { useState } from 'react';
import { PrimaryButton, OutlineButton } from '~/components/button';
import { Modal, ModalTitle, ModalText, ModalFooter } from '~/components/modal';

export default function ForkWorkflowVersionModalButton ({ workflowVersion }) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const handleForkButtonClick = () => {
        setOpen(true);
    };

    const handleCancelButtonClick = () => {
        setOpen(false);
    };

    return (
        <>
            <OutlineButton
                onClick={handleForkButtonClick}>
                Fork
            </OutlineButton>

            {open && (
                <Modal>
                    <ModalTitle>
                        Fork Workflow Version
                    </ModalTitle>

                    <ModalText>
                        Would you like to fork this workflow version?
                    </ModalText>
                    <ModalFooter>
                        <OutlineButton
                            disabled={pending}
                            onClick={handleCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <PrimaryButton
                            disabled>
                            Fork
                        </PrimaryButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    )
}