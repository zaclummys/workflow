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
    ModalTitle,
    ModalFooter,
} from '~/components/modal';

import {
    Form,
    Field,
    Label,
    Input,
    TextArea,
} from '~/components/form';

import editWorkflowAction from '~/actions/edit-workflow-action';

export default function EditWorkflowModalButton ({
    workflow
}) {
    const formId = useId();

    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const onEditButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();

        setIsSaving(true);

        try {
            const { success } = await editWorkflowAction({
                name: event.target.name.value,
                description: event.target.description.value,
                workflowId: workflow.id,
            });
    
            if (success) {
                setIsOpen(false);
            }
            
        } finally {
            setIsSaving(false);
        }
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

                    <Form
                        id={formId}
                        onSubmit={onFormSubmit}>
                        <Field>
                            <Label>
                                Name
                            </Label>

                            <Input
                                type="text"
                                name="name"
                                required
                                disabled={isSaving}
                                defaultValue={workflow.name} />
                        </Field>

                        <Field>
                            <Label>
                                Description
                            </Label>

                            <TextArea
                                name="description"
                                disabled={isSaving}
                                defaultValue={workflow.description} />
                        </Field>
                    </Form>

                    <ModalFooter>
                        <OutlineButton
                            disabled={isSaving}
                            onClick={onCancelButtonClick}>
                            Cancel
                        </OutlineButton>

                        <PrimaryButton
                            type="submit"
                            disabled={isSaving}
                            form={formId}>
                            Save
                        </PrimaryButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}