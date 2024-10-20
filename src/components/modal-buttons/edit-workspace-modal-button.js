'use client';

import {
    useId,
    useState,
} from 'react';

import {
    PrimaryButton,
    OutlineButton,
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

import editWorkspaceAction from '~/actions/edit-workspace-action';

export default function EditWorkspaceModalButton ({ workspace }) {
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
            const { success } = await editWorkspaceAction({
                id: workspace.id,
                name: event.target.elements.name.value,
                description: event.target.elements.description.value,
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
                        Edit Workspace
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
                                defaultValue={workspace.name}
                            />
                        </Field>

                        <Field>
                            <Label>
                                Description
                            </Label>

                            <TextArea
                                name="description"
                                defaultValue={workspace.description}
                            />
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