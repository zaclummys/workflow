import {
    useId,
    useState,
} from 'react';

import {
    Form,
    Field,
    Label,
    Input,
    Radio,
    Select,
    Option,
    TextArea,
    InlineLabel,
    Checkbox,
} from '~/components/form';

import {
    PrimaryButton,
    OutlineButton,
} from '~/components/button';

import ValueFacade from '~/components/value-facade';

const defaultVariable = {
    name: '',
    description: '',
    type: 'string',
    defaultValue: null,
    markedAsInput: true,
    markedAsOutput: true,
};

export default function VariableForm ({
    variable = defaultVariable,
    onConfirm,
    onCancel,
}) {
    const [values, setValues] = useState(variable);

    const variableHasNotInitialValue = values.defaultValue == null && !values.markedAsInput;

    const handleSubmit = event => {
        event.preventDefault();

        if (variableHasNotInitialValue) {
            return;
        }

        onConfirm(values);
    }

    const handleNameChange = event => {
        setValues(values => ({
            ...values,
            name: event.target.value,
        }));
    };

    const handleDescriptionChange = event => {
        setValues(values => ({
            ...values,
            description: event.target.value,
        }));
    }

    const handleTypeChange = event => {
        const type = event.target.value;

        setValues(values => ({
            ...values,
            type,
            defaultValue: null,
        }));
    }

    const handleRemoveDefaultValueButtonClick = () => {
        setValues(values => ({
            ...values,
            defaultValue: null,
        }));
    };

    const handleAddDefaultValueButtonClick = () => {
        setValues(values => {
            switch (values.type) {
                case 'string':
                    return {
                        ...values,
                        defaultValue: {
                            type: 'string',
                            string: '',
                        }
                    };

                case 'number':
                    return {
                        ...values,
                        defaultValue: {
                            type: 'number',
                            number: 0,
                        }
                    };

                case 'boolean':
                    return {
                        ...values,
                        defaultValue: {
                            type: 'boolean',
                            boolean: false,
                        }
                    };

                default:
                    return values;
            }
        });
    };

    const handleDefaultValueChange = (event) => {
        setValues(values => {
            switch (values.type) {
                case 'string':
                    return {
                        ...values,
                        defaultValue: {
                            type: 'string',
                            string: event.target.value,
                        }
                    };

                case 'number':
                    return {
                        ...values,
                        defaultValue: {
                            type: 'number',
                            number: event.target.value,
                        }
                    };

                case 'boolean':
                    return {
                        ...values,
                        defaultValue: {
                            type: 'boolean',
                            boolean: event.target.value,
                        }
                    };

                default:
                    return values;
            }
        });
    }

    const handleMarkedAsInputChange = event => {
        setValues(values => ({
            ...values,
            markedAsInput: event.target.checked,
        }));
    };

    const handleMarkedAsOutputChange = event => {
        setValues(values => ({
            ...values,
            markedAsOutput: event.target.checked,
        }));
    };

    const handleCancelButtonClick = () => {
        onCancel();
    };

    const nameId = useId();
    const typeId = useId();
    const descriptionId = useId();
    const defaultValueId = useId();
    const markedAsInputId = useId();
    const markedAsOutputId = useId();

    return (
        <Form
            onSubmit={handleSubmit}>
            <Field>
                <Label
                    htmlFor={nameId}>
                    Name
                </Label>

                <Input
                    type="text"
                    id={nameId}
                    value={values.name}
                    onChange={handleNameChange}
                    required
                />
            </Field>

            <Field>
                <Label
                    htmlFor={descriptionId}>
                    Description
                </Label>

                <TextArea
                    id={descriptionId}
                    value={values.description}
                    onChange={handleDescriptionChange}
                />
            </Field>

            <Field>
                <Label
                    htmlFor={typeId}>
                    Type
                </Label>

                <Select
                    id={typeId}
                    title="Select the type of the variable"
                    value={values.type}
                    onChange={handleTypeChange}
                >
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                </Select>
            </Field>

            <Field>
                <div className="flex flex-row justify-between">
                    <Label
                        htmlFor={defaultValueId}
                        disabled={values.defaultValue == null}
                    >
                        Default Value
                    </Label>

                    <ToggleDefaultValue
                        hasDefaultValue={values.defaultValue != null}
                        onAddButtonClick={handleAddDefaultValueButtonClick}
                        onRemoveButtonClick={handleRemoveDefaultValueButtonClick}
                    />
                </div>

                {values.defaultValue != null && (
                    <ValueFacade
                        id={defaultValueId}
                        value={values.defaultValue}
                        onChange={handleDefaultValueChange}
                    />
                )}
            </Field>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <Checkbox
                        id={markedAsInputId}
                        checked={values.markedAsInput}
                        onChange={handleMarkedAsInputChange} />

                    <InlineLabel
                        htmlFor={markedAsInputId} >
                        Allow this variable to be available as input.
                    </InlineLabel>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Checkbox
                        id={markedAsOutputId}
                        checked={values.markedAsOutput}
                        onChange={handleMarkedAsOutputChange} />

                    <InlineLabel
                        htmlFor={markedAsOutputId}>
                        Allow this variable to be available as output.
                    </InlineLabel>
                </div>
            </div>

            {variableHasNotInitialValue && (
                <span className="text-danger">
                    This variable must be marked as input or have a default value.
                </span>
            )}

            <OutlineButton
                onClick={handleCancelButtonClick}>
                Cancel
            </OutlineButton>

            <PrimaryButton type="submit">
                Confirm
            </PrimaryButton>
        </Form>
    );
}

function ToggleDefaultValue ({
    hasDefaultValue,
    onAddButtonClick,
    onRemoveButtonClick,
}) {
    return (
        hasDefaultValue ? (
            <button
                type="button"
                className="font-medium text-sm text-primary"
                onClick={onRemoveButtonClick}
            >
                Remove default value
            </button>
        ) : (
            <button
                type="button"
                className="font-medium text-sm text-primary"
                onClick={onAddButtonClick}
            >
                Add default value
            </button>
        )
    )
}
