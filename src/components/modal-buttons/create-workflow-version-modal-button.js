'use client';

import { useState } from 'react';

import useNavigation from '~/hooks/use-navigation';

import {
    PrimaryButton,
    OutlineButton,
} from '~/components/button';

import {
    Modal,
    ModalTitle,
    ModalFooter,
} from '~/components/modal';

import createWorkflowVersionAction from '~/actions/create-workflow-version-action';

export default function CreateWorkflowVersionModalButton ({ workflowId }) {
    const { navigateToWorkflowVersion } = useNavigation();

    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onNewVersionButtonClick = () => {
        setIsOpen(true);
    };

    const onCreateButtonClick = async () => {
        setPending(true);

        try {
            const { success, workflowVersionId } = await createWorkflowVersionAction(workflowId);

            if (success) {
                navigateToWorkflowVersion(workflowVersionId);
            }
        } catch {
            setPending(false);
        }
    };

    return (
        <>
            <PrimaryButton
                onClick={onNewVersionButtonClick}>
                New Version
            </PrimaryButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>
                        Create New Version
                    </ModalTitle>

                    <span>
                        Are you sure you want to create a new version of this workflow?
                    </span>

                    <ModalFooter>
                        <OutlineButton
                            disabled={pending}
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <PrimaryButton
                            disabled={pending}
                            onClick={onCreateButtonClick}>
                            Create
                        </PrimaryButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}