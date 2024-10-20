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

import createWorkflowAction from '~/actions/create-workflow-action';
import useNavigation from '~/hooks/use-navigation';

export default function CreateWorkflowModalButton ({ workspaceId }) {
    const [isOpen, setIsOpen] = useState(false);

    const onButtonClick = () => {
        setIsOpen(true);
    };

    const onCancelButtonClick = () => {
        setIsOpen(false);
    };

    if (!workspaceId) {
        return null;
    }
    
    return (
        <>
            <PrimaryButton
                onClick={onButtonClick}>
                New Workflow
            </PrimaryButton>

            {isOpen && (
                <CreateWorkflowModal
                    workspaceId={workspaceId}
                    onCancelButtonClick={onCancelButtonClick} />
            )}
        </>
    );
}

function CreateWorkflowModal ({
    workspaceId,
    onCancelButtonClick,
}) {
    const { navigateToWorkflow } = useNavigation();

    const formId = useId();

    const [pending, setPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPending(true);

        try {
            const { success, workflowId } = await createWorkflowAction({
                workspaceId,
                name: event.target.name.value,
                description: event.target.description.value,
            });

            if (success) {
                navigateToWorkflow(workflowId);
            } 
        } catch {
            setPending(false);
        }
    };

    return (
        <Modal>
            <ModalTitle>
                New Workflow
            </ModalTitle>

            <CreateWorkflowModalForm
                formId={formId}
                disabled={pending}
                onSubmit={handleSubmit}
            />

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

function CreateWorkflowModalForm ({
    formId,
    disabled,
    onSubmit,
}) {
    const nameId = useId();
    const descriptionId = useId();

    return (
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
                    disabled={disabled}
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
                    disabled={disabled}
                    name="description"
                />
            </Field>
        </Form>
    );
}