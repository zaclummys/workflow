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
    id,

    name,
    description,
    type,
    defaultValue,
    markedAsInput,
    markedAsOutput,
    hasDefaultValue,

    disabled,

    onFormSubmit,
    onNameChange,
    onDescriptionChange,
    onTypeChange,
    onDefaultValueChange,
    onMarkedAsInputChange,
    onMarkedAsOutputChange,
    onAddDefaultValueButtonClick,
    onRemoveDefaultValueButtonClick,
}) {
    const formId = useId();
    const nameId = useId();
    const typeId = useId();
    const descriptionId = useId();
    const defaultValueId = useId();
    const markedAsInputId = useId();
    const markedAsOutputId = useId();

    return (
        <Form
            id={id}
            onSubmit={onFormSubmit}>
            <Field>
                <Label
                    aria-disabled={disabled}
                    htmlFor={nameId}>
                    Name
                </Label>

                <Input
                    type="text"
                    id={nameId}
                    value={name}
                    onChange={onNameChange}
                    disabled={disabled}
                    required />
            </Field>

            <Field>
                <Label
                    aria-disabled={disabled}
                    htmlFor={descriptionId}>
                    Description
                </Label>

                <TextArea
                    id={descriptionId}
                    value={description}
                    onChange={onDescriptionChange}
                    disabled={disabled} />
            </Field>

            <Field>
                <Label
                    aria-disabled={disabled}
                    htmlFor={typeId}>
                    Type
                </Label>

                <Select
                    id={typeId}
                    title="Select the type of the variable"
                    value={type}
                    onChange={onTypeChange}
                    disabled={disabled}>
                    <Option value="string">String</Option>
                    <Option value="number">Number</Option>
                    <Option value="boolean">Boolean</Option>
                </Select>
            </Field>

            <Field>
                <div className="flex flex-row justify-between">
                    <Label
                        aria-disabled={!hasDefaultValue}
                        htmlFor={defaultValueId}>
                        Default Value
                    </Label>

                    {!disabled && (
                        hasDefaultValue ? (
                            <button
                                type="button"
                                className="font-medium text-sm text-primary"
                                onClick={onRemoveDefaultValueButtonClick}>
                                Remove
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="font-medium text-sm text-primary"
                                onClick={onAddDefaultValueButtonClick}>
                                Add
                            </button>
                        )
                    )}
                </div>

                <DefaultValueInput
                    id={defaultValueId}
                    disabled={!hasDefaultValue}
                    value={defaultValue}
                    onChange={onDefaultValueChange}
                    type={type} />
            </Field>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <Checkbox
                        disabled={disabled}
                        id={markedAsInputId}
                        checked={markedAsInput}
                        onChange={onMarkedAsInputChange} />

                    <InlineLabel
                        aria-disabled={disabled}
                        htmlFor={markedAsInputId} >
                        Allow this variable to be available as input.
                    </InlineLabel>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Checkbox
                        disabled={disabled}
                        id={markedAsOutputId}
                        checked={markedAsOutput}
                        onChange={onMarkedAsOutputChange} />

                    <InlineLabel
                        aria-disabled={disabled}
                        htmlFor={markedAsOutputId}>
                        Allow this variable to be available as output.
                    </InlineLabel>
                </div>
            </div>
        </Form>
    );
}


function DefaultStringInput ({
    id,
    value,
    disabled,
    onChange,
}) {
    return (
        <Input
            required
            id={id}
            value={value === null ? '' : value}
            disabled={disabled}
            onChange={event => onChange(event.target.value)}
            
            type="text" />
    );
}

function DefaultNumberInput({
    id,
    value,
    disabled,
    onChange,
}) {
    return (
        <Input
            required
            id={id}
            value={value === null ? '' : value}
            disabled={disabled}
            onChange={event => onChange(parseInt(event.target.value))}
            type="number"
            step="1" />
    );
}

function DefaultBooleanInput({
    value,
    disabled,
    onChange,
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
                    checked={value === true}
                    onChange={() => onChange(true)}
                    name="defaultValue" />

                <InlineLabel
                    aria-disabled={disabled}
                    htmlFor={trueId}>
                    True
                </InlineLabel>
            </div>

            <div className="flex flex-row items-center gap-2">
                <Radio
                    required
                    id={falseId}
                    disabled={disabled}
                    checked={value === false}
                    onChange={() => onChange(false)}
                    name="defaultValue" />

                <InlineLabel
                    aria-disabled={disabled}
                    htmlFor={falseId}>
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
                <DefaultStringInput
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={onChange} />
            );

        case 'number':
            return (
                <DefaultNumberInput
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={onChange} />
            );

        case 'boolean':
            return (
                <DefaultBooleanInput
                    value={value}
                    disabled={disabled}
                    onChange={onChange} />
            );

        default:
            return null;
    }
}