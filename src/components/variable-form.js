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
} from './form';

const createDefaultValue = (type) => {
    switch (type) {
        case 'string':
            return {
                type: 'string',
                string: '',
            };

        case 'number':
            return {
                type: 'number',
                number: '0',
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: 'false',
            };
    }
}

const updateDefaultValue = ({ type, value }) => {
    switch (type) {
        case 'string':
            return {
                type: 'string',
                string: value,
            };

        case 'number':
            return {
                type: 'number',
                number: value,
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: value,
            };
    }
}

const coerceDefaultValue = (defaultValue) => {
    if (defaultValue == null) {
        return null;
    }

    switch (defaultValue.type) {
        case 'string':
            return {
                type: 'string',
                string: defaultValue.string,
            };

        case 'number':
            return {
                type: 'number',
                number: coerceNumber(defaultValue.number),
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: coerceBoolean(defaultValue.boolean),
            };
    }
}

const decoerceDefaultValue = (defaultValue) => {
    if (defaultValue == null) {
        return null;
    }

    switch (defaultValue.type) {
        case 'string':
            return {
                type: 'string',
                string: defaultValue.string,
            };

        case 'number':
            return {
                type: 'number',
                number: defaultValue.number.toString(),
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: defaultValue.boolean.toString(),
            };
    }
}

const coerceNumber = (number) => {
    const coercedNumber = Number(number);

    if (isNaN(coercedNumber)) {
        throw new Error('Invalid number value.');
    }

    return coercedNumber;
};

const coerceBoolean = (boolean) => {
    switch (boolean) {
        case 'true':
            return true;

        case 'false':
            return false;

        default:
            throw new Error(`Invalid boolean value: ${boolean}.`);
    }
};

export default function VariableForm ({
    formId,
    initialValues,
    onFormSubmit,
}) {
    const defaultValues = {
        name: '',
        description: '',
        type: 'string',
        defaultValue: null,
        markedAsInput: true,
        markedAsOutput: true,
    };

    const [values, setValues] = useState({
        ...defaultValues,
        ...initialValues,
        defaultValue: decoerceDefaultValue(initialValues?.defaultValue),
    });

    const variableHasNotInitialValue = values.defaultValue == null && !values.markedAsInput;

    const handleFormSubmit = event => {
        event.preventDefault();

        if (variableHasNotInitialValue) {
            return;
        }
        
        const submitValues = {
            ...values,
            defaultValue: coerceDefaultValue(values.defaultValue),
        };

        onFormSubmit(event, submitValues);
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
            defaultValue: values.defaultValue === null ? null : createDefaultValue(type),
        }));
    }

    const handleRemoveDefaultValueButtonClick = () => {
        setValues(values => ({
            ...values,
            defaultValue: null,
        }));
    };

    const handleAddDefaultValueButtonClick = () => {
        setValues(values => ({
            ...values,
            defaultValue: createDefaultValue(values.type)
        }));
    };

    const handleDefaultValueChange = (event) => {
        setValues(values => ({
            ...values,
            defaultValue: updateDefaultValue({
                type: values.type,
                value: event.target.value,
            }),
        }));
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

    const nameId = useId();
    const typeId = useId();
    const descriptionId = useId();
    const defaultValueId = useId();
    const markedAsInputId = useId();
    const markedAsOutputId = useId();

    return (
        <Form
            id={formId}
            onSubmit={handleFormSubmit}>
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
                    <DefaultValueFacade
                        id={defaultValueId}
                        type={values.type}
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
        </Form>
    );
}

function DefaultValueString ({
    id,
    value,
    disabled,
    onChange,
}) {
    return (
        <Input
            required
            id={id}
            value={value}
            disabled={disabled}
            onChange={onChange}
            type="text"
        />
    );
}

function DefaultValueNumber({
    id,
    value,
    disabled,
    onChange,
}) {
    return (
        <Input
            required
            id={id}
            value={value}
            disabled={disabled}
            onChange={onChange}
            type="number"
            step="1"
        />
    );
}

function DefaultValueBoolean({
    value,
    onChange,
    disabled,
}) {
    const trueId = useId();
    const falseId = useId();

    return (
        <>
            <div className="flex flex-row items-center gap-2">
                <Radio
                    required
                    id={trueId}
                    disabled={disabled}
                    value="true"
                    checked={value === 'true'}
                    onChange={onChange}
                />

                <InlineLabel
                    disabled={disabled}
                    htmlFor={trueId}
                >
                    True
                </InlineLabel>
            </div>

            <div className="flex flex-row items-center gap-2">
                <Radio
                    required
                    id={falseId}
                    disabled={disabled}
                    value="false"
                    checked={value === 'false'}
                    onChange={onChange}
                />

                <InlineLabel
                    disabled={disabled}
                    htmlFor={falseId}
                >
                    False
                </InlineLabel>
            </div>
        </>
    );
}

function DefaultValueFacade ({
    id,
    value,
    disabled,
    onChange,
}) {
    switch (value.type) {
        case 'string':
            return (
                <DefaultValueString
                    id={id}
                    value={value.string}
                    disabled={disabled}
                    onChange={onChange}
                />
            );

        case 'number':
            return (
                <DefaultValueNumber
                    id={id}
                    value={value.number}
                    disabled={disabled}
                    onChange={onChange}
                />
            );

        case 'boolean':
            return (
                <DefaultValueBoolean
                    value={value.boolean}
                    disabled={disabled}
                    onChange={onChange}
                />
            );

        default:
            return null;
    }
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
                Remove
            </button>
        ) : (
            <button
                type="button"
                className="font-medium text-sm text-primary"
                onClick={onAddButtonClick}
            >
                Add
            </button>
        )
    )
}