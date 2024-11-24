import {
    useId,
    useState,
} from 'react';

import { coerceBoolean, coerceNumber } from '~/coerce';

import {
    Label,
    Field,
} from '~/components/form';

import {
    Modal,
    ModalFooter,
    ModalTitle,
} from '~/components/modal';

import {
    OutlineButton,
    PrimaryButton,
} from '~/components/button';

import ValueFacade from '~/components/value-facade';

export default function ExecuteWorkflowVersionModal ({
    executing,
    workflowVersion,

    onConfirm,
    onCancel,
}) {
    const initialInputs = workflowVersion.variables
        .filter(variable => variable.markedAsInput)
        .map(variable => ({
            variable,
            id: variable.id,
            value: variable.defaultValue.toString(),
        }));

    const [inputs, setInputs] = useState(initialInputs);

    const handleConfirmButtonClick = () => {
        const confirmedInputs = inputs
            .map(input => {
                switch (input.variable.type) {
                    case 'number':
                        return {
                            ...input,
                            value: coerceNumber(input.value),
                        };

                    case 'boolean':
                        return {
                            ...input,
                            value: coerceBoolean(input.value),
                        };

                    default:
                        return input;
                }
            })
            .map(input => ({
                id: input.id,
                value: input.value,
            }));

        onConfirm(confirmedInputs);
    };

    const handleCancelButtonClick = () => {
        onCancel();
    };

    const handleInputChange = (event, inputId) => {
        setInputs(inputs => inputs.map(input => {
            if (input.id === inputId) {
                return {
                    ...input,
                    value: event.target.value,
                };
            } else {
                return input;
            }
        }));
    };

    const workflowVersionId = useId();

    return (
        <Modal>
            <ModalTitle>
                Execute Workflow Version
            </ModalTitle>


            <Field>
                <Label>
                    Workflow Version
                </Label>

                <span>
                    {workflowVersion.workflow.name} - Version {workflowVersion.number}
                </span>
            </Field>

            {inputs.map(input => (
                <WorkflowVersionInput
                    key={input.id}
                    input={input}
                    onChange={event => handleInputChange(event, input.id)}
                />
            ))}

            <ModalFooter>
                <OutlineButton
                    disabled={executing}
                    onClick={handleCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    disabled={executing}
                    onClick={handleConfirmButtonClick}>
                    Confirm
                </PrimaryButton>
            </ModalFooter>
        </Modal>
    );
}

function WorkflowVersionInput ({
    input,
    onChange,
}) {
    return (
        <Field key={input.id}>
            <Label htmlFor={input.id}>
                {input.variable.name} ({input.variable.type})
            </Label>

            <ValueFacade
                id={input.id}
                type={input.variable.type}
                value={input.value}
                onChange={onChange}
            />
        </Field>
    )
}