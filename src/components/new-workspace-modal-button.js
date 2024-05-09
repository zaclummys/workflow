'use client';

import { useId, useState } from 'react';

import { Modal, ModalFooter, ModalTitle } from '~/components/modal';
import { OutlineButton, PrimaryButton } from '~/components/button';
import { Form, Field, Input, Label, TextArea } from '~/components/form';
import useForm from '~/hooks/use-form';

export default function NewWorkspaceModalButton() {
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
                <NewWorkspaceModal
                    onCancelButtonClick={onCancelButtonClick} />
            )}
        </>
    );
}

function NewWorkspaceModal ({
    onCancelButtonClick,
}) {
    const formId = useId();
    const nameId = useId();
    const descriptionId = useId();

    const { pending, error, onSubmit } = useForm(async (event) => {
        
    })

    return (
        <Modal>
            <ModalTitle>
                New Workspace
            </ModalTitle>

            <Form
                id={formId}
                onSubmit={onSubmit}>
                <Field>
                    <Label
                        htmlFor={nameId}>
                        Name
                    </Label>

                    <Input
                        id={nameId}
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
                        name="description"
                        required />
                </Field>
            </Form>



            <ModalFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    form={formId}>
                    Create
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    );
}
