'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';

import useForm from '~/hooks/use-form';

import { OutlineButton, PrimaryButton } from '~/components/button';
import { Modal, ModalFooter, ModalTitle } from '~/components/modal';
import { Form, Field, Input, Label, TextArea } from '~/components/form';

import createWorkflowAction from '~/actions/create-workflow-action';

export default function CreateWorkflowModalButton () {
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
                New Workflow
            </PrimaryButton>

            {isOpen && (
                <CreateWorkflowModal
                    onCancelButtonClick={onCancelButtonClick} />
            )}
        </>
    );
}

function CreateWorkflowModal ({
    onCancelButtonClick,
}) {
    const router = useRouter();

    const formId = useId();
    const nameId = useId();
    const descriptionId = useId();

    const { pending, error, onSubmit } = useForm(async (event) => {
        return createWorkflowAction({
            name: event.target.name.value,
            description: event.target.description.value,
        });
    }, ({ workflowId }) => {
        router.push(`/workflow/${workflowId}`);
    });

    return (
        <Modal>
            <ModalTitle>
                New Workflow
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
                        required />
                </Field>
            </Form>

            {error && (
                <span className="text-danger">
                    {error}
                </span>
            )}

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
