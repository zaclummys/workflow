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

export default function VariableForm ({
    formId,
    disabled,
    initialValues = {},
    onFormSubmit,
}) {
    const getDefaultValueFromType = (type) => {
        switch (type) {
            case 'string':
                return '';

            case 'number':
                return 0;

            case 'boolean':
                return true;

            default:
                return null;
        }
    }

    const defaultValues = {
        name: '',
        description: '',
        type: 'string',
        defaultValue: null,
        markedAsInput: false,
        markedAsOutput: false,
    };

    const [values, setValues] = useState({
        ...defaultValues,
        ...initialValues,
    });

    const handleFormSubmit = event => {
        event.preventDefault();

        onFormSubmit(event, values);
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
            defaultValue: values.defaultValue == null ? null : getDefaultValueFromType(type),
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
            defaultValue: getDefaultValueFromType(values.type),
        }));
    };

    const handleDefaultValueChange = (event, defaultValue) => {
        setValues(values => ({
            ...values,
            defaultValue,
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

    const defaultValueIsDisabled = disabled || values.defaultValue === null;

    return (
        <Form
            id={formId}
            onSubmit={handleFormSubmit}>
            <Field>
                <Label
                    disabled={disabled}
                    htmlFor={nameId}>
                    Name
                </Label>

                <Input
                    type="text"
                    id={nameId}
                    value={values.name}
                    onChange={handleNameChange}
                    disabled={disabled}
                    required />
            </Field>

            <Field>
                <Label
                    disabled={disabled}
                    htmlFor={descriptionId}>
                    Description
                </Label>

                <TextArea
                    id={descriptionId}
                    value={values.description}
                    onChange={handleDescriptionChange}
                    disabled={disabled} />
            </Field>

            <Field>
                <Label
                    disabled={disabled}
                    htmlFor={typeId}>
                    Type
                </Label>

                <Select
                    id={typeId}
                    title="Select the type of the variable"
                    value={values.type}
                    onChange={handleTypeChange}
                    disabled={disabled}>
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                </Select>
            </Field>

            <Field>
                <div className="flex flex-row justify-between">
                    <Label
                        htmlFor={defaultValueId}
                        disabled={defaultValueIsDisabled}
                    >
                        Default Value
                    </Label>

                    {!disabled && (
                        values.defaultValue == null ? (
                            <button
                                type="button"
                                className="font-medium text-sm text-primary"
                                onClick={handleAddDefaultValueButtonClick}
                            >
                                Add
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="font-medium text-sm text-primary"
                                onClick={handleRemoveDefaultValueButtonClick}
                            >
                                Remove
                            </button>
                        )
                    )}
                </div>

                <DefaultValueInput
                    id={defaultValueId}
                    type={values.type}
                    value={values.defaultValue}
                    disabled={defaultValueIsDisabled}
                    onChange={handleDefaultValueChange}
                />
            </Field>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <Checkbox
                        disabled={disabled}
                        id={markedAsInputId}
                        checked={values.markedAsInput}
                        onChange={handleMarkedAsInputChange} />

                    <InlineLabel
                        disabled={disabled}
                        htmlFor={markedAsInputId} >
                        Allow this variable to be available as input.
                    </InlineLabel>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Checkbox
                        disabled={disabled}
                        id={markedAsOutputId}
                        checked={values.markedAsOutput}
                        onChange={handleMarkedAsOutputChange} />

                    <InlineLabel
                        disabled={disabled}
                        htmlFor={markedAsOutputId}>
                        Allow this variable to be available as output.
                    </InlineLabel>
                </div>
            </div>
        </Form>
    );
}


function DefaultValueString ({
    id,
    value,
    disabled,
    onChange,
}) {
    const handleChange = event => {
        onChange(event, event.target.value);
    };

    return (
        <Input
            required
            id={id}
            value={value === null ? '' : value}
            disabled={disabled}
            onChange={handleChange}
            
            type="text" />
    );
}

function DefaultValueNumber({
    id,
    value,
    disabled,
    onChange,
}) {
    const handleChange = event => {
        onChange(event, +event.target.value);
    }

    return (
        <Input
            required
            id={id}
            value={value === null ? '' : value}
            disabled={disabled}
            onChange={handleChange}
            type="number"
            step="1" />
    );
}

function DefaultValueBoolean({
    value,
    onChange,
    disabled,
}) {
    const trueId = useId();
    const falseId = useId();

    const handleTrueChange = event => {
        onChange(event, true);
    }

    const handleFalseChange = event => {
        onChange(event, false);
    }

    return (
        <>
            <div className="flex flex-row items-center gap-2">
                <Radio
                    required
                    id={trueId}
                    disabled={disabled}
                    checked={value === true}
                    onChange={handleTrueChange}
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
                    checked={value === false}
                    onChange={handleFalseChange}
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

function DefaultValueInput({
    id,
    type,
    value,
    disabled,
    onChange,
}) {
    switch (type) {
        case 'string':
            return (
                <DefaultValueString
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                />
            );

        case 'number':
            return (
                <DefaultValueNumber
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                />
            );

        case 'boolean':
            return (
                <DefaultValueBoolean
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                />
            );

        default:
            return null;
    }
}