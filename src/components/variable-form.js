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
    initialValues,
    onFormSubmit,
}) {
    const defaultValues = {
        name: '',
        description: '',
        type: 'string',
        hasDefaultValue: false,
        defaultValue: null,
        markedAsInput: false,
        markedAsOutput: false,
    };

    const [values, setValues] = useState(initialValues ?? defaultValues);

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
            defaultValue: null,
        }));
    }

    const handleRemoveDefaultValueButtonClick = () => {
        setValues(values => ({
            ...values,
            hasDefaultValue: false,
            defaultValue: null,
        }));
    };

    const handleAddDefaultValueButtonClick = () => {
        setValues(values => ({
            ...values,
            hasDefaultValue: true,
            defaultValue: null,
        }));
    };

    const handleDefaultValueChange = (event) => {
        setValues(values => ({
            ...values,
            defaultValue: event.target.value,
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
                        disabled={!values.hasDefaultValue}
                    >
                        Default Value
                    </Label>

                    <ToggleDefaultValue
                        hasDefaultValue={values.hasDefaultValue}
                        onAddButtonClick={handleAddDefaultValueButtonClick}
                        onRemoveButtonClick={handleRemoveDefaultValueButtonClick}
                    />
                </div>

                <DefaultValue
                    id={defaultValueId}
                    type={values.type}
                    value={values.defaultValue}
                    disabled={!values.hasDefaultValue}
                    onChange={handleDefaultValueChange}
                />
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
            value={value ?? ''}
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
            value={value ?? ''}
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

function DefaultValue ({
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