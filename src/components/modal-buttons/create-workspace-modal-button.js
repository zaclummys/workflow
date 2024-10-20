'use client';

import {
    useId,
    useState, 
} from 'react';

import {
    OutlineButton, 
    PrimaryButton, 
} from '~/components/button';

import {
    Modal, 
    ModalFooter, 
    ModalTitle, 
} from '~/components/modal';

import {
    Form, 
    Field, 
    Input, 
    Label, 
    TextArea, 
} from '~/components/form';

import useNavigation from '~/hooks/use-navigation';
import createWorkspaceAction from '~/actions/create-workspace-action';

export default function NewWorkspaceModalButton () {
    const [isOpen, setIsOpen] = useState(false);

    const onButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <PrimaryButton
                onClick={onButtonClick}>
                New Workspace
            </PrimaryButton>

            {isOpen && (
                <CreateWorkspaceModal
                    onCancelButtonClick={onCancelButtonClick} />
            )}
        </>
    );
}

function CreateWorkspaceModal ({ onCancelButtonClick }) {
    const { navigateToWorkspace } = useNavigation();

    const [pending, setPending] = useState(false);

    const formId = useId();
    const nameId = useId();
    const descriptionId = useId();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPending(true);

        try {
            const {
                success,
                workspaceId,
            } = await createWorkspaceAction({
                name: event.target.name.value,
                description: event.target.description.value,
            });
    
            if (success) {
                navigateToWorkspace(workspaceId);
            }
        } catch {
            setPending(false);
        }
    }

    return (
        <Modal>
            <ModalTitle>
                New Workspace
            </ModalTitle>

            <Form
                id={formId}
                onSubmit={handleSubmit}>
                <Field>
                    <Label
                        htmlFor={nameId}>
                        Name
                    </Label>

                    <Input
                        id={nameId}
                        disabled={pending}
                        name="name"
                        type="text"
                        required />
                </Field>

                <Field>
                    <Label
                        htmlFor={descriptionId}>
                        Description
                    </Label>

                    <TextArea
                        id={descriptionId}
                        disabled={pending}
                        name="description"
                    />
                </Field>
            </Form>

            <ModalFooter>
                <OutlineButton
                    disabled={pending}
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    type="submit"
                    form={formId}
                    disabled={pending}>
                    Create
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    );
}
