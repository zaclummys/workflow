'use client';

import {
    useId,
    useState,
} from 'react';

import {
    PrimaryButton,
    OutlineButton,
} from './button';

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

import {
    WorkflowVersionSidebar,
    WorkflowVersionSidebarTitle,
    WorkflowVersionSidebarContent,
    WorkflowVersionSidebarFooter,
} from './workflow-version-sidebar';

export default function EditVariableWorkflowSidebar({
    variableId,
    workflowVersion,
    onCancelButtonClick,
    onSuccess,
}) {
    const variable = workflowVersion.variables.find(variable => variable.id === variableId);

    if (!variable) {
        return null;
    }

    const [type, setType] = useState(variable.type);
    const [name, setName] = useState(variable.name);
    const [description, setDescription] = useState(variable.description);
    const [defaultValue, setDefaultValue] = useState(variable.defaultValue);
    const [markedAsInput, setMarkedAsInput] = useState(variable.markedAsInput);
    const [markedAsOutput, setMarkedAsOutput] = useState(variable.markedAsOutput);

    const [hasDefaultValue, setHasDefaultValue] = useState(defaultValue !== null);

    const formId = useId();
    const nameId = useId();
    const descriptionId = useId();
    const defaultValueId = useId();
    const typeId = useId();
    const markAsInputId = useId();
    const markAsOutputId = useId();

    const handleFormSubmit = event => {
        event.preventDefault();

        onSuccess();
    };

    const handleInputCheckboxChange = event => {
        setMarkedAsInput(event.target.checked);
    }

    const handleOutputCheckboxChange = event => {
        setMarkedAsOutput(event.target.checked);
    }

    const handleRemoveDefaultValueButtonClick = () => {
        setHasDefaultValue(false);
        setDefaultValue(null);
    };

    const handleAddDefaultValueButtonClick = () => {
        setHasDefaultValue(true);
    };

    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleTypeChange = event => {        
        setType(event.target.value);
        setDefaultValue(null);
    };

    const handleDefaultValueChange = value => {
        setDefaultValue(value);
    };

    return (
        <WorkflowVersionSidebar>
            <WorkflowVersionSidebarTitle>
                Edit Variable
            </WorkflowVersionSidebarTitle>

            <WorkflowVersionSidebarContent>
                <Form
                    id={formId}
                    onSubmit={handleFormSubmit}>
                    <Field>
                        <Label htmlFor={nameId}>
                            Name
                        </Label>

                        <Input
                            type="text"
                            id={nameId}
                            value={name}
                            onChange={handleNameChange}
                            required />
                    </Field>

                    <Field>
                        <Label
                            htmlFor={descriptionId}>
                            Description
                        </Label>

                        <TextArea
                            id={descriptionId}
                            value={description}
                            onChange={handleDescriptionChange} />
                    </Field>

                    <Field>
                        <Label
                            htmlFor={typeId}>
                            Type
                        </Label>

                        <Select
                            id={typeId}
                            title="Select the type of the variable"
                            value={type}
                            onChange={handleTypeChange}>
                            <Option value="text">Text</Option>
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

                            {hasDefaultValue ? (
                                <button
                                    type="button"
                                    className="font-medium text-sm text-primary"
                                    onClick={handleRemoveDefaultValueButtonClick}>
                                    Remove
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="font-medium text-sm text-primary"
                                    onClick={handleAddDefaultValueButtonClick}>
                                    Add
                                </button>
                            )}
                        </div>

                        <DefaultValueInput
                            id={defaultValueId}
                            disabled={!hasDefaultValue}
                            value={defaultValue}
                            onChange={handleDefaultValueChange}
                            type={type} />
                    </Field>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox
                                id={markAsInputId}
                                checked={markedAsInput}
                                onChange={handleInputCheckboxChange} />

                            <InlineLabel
                                htmlFor={markAsInputId} >
                                Allow this variable to be available as input.
                            </InlineLabel>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <Checkbox
                                id={markAsOutputId}
                                checked={markedAsOutput}
                                onChange={handleOutputCheckboxChange} />

                            <InlineLabel
                                htmlFor={markAsOutputId}>
                                Allow this variable to be available as output.
                            </InlineLabel>
                        </div>
                    </div>
                </Form>
            </WorkflowVersionSidebarContent>

            <WorkflowVersionSidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    form={formId}>
                    Save
                </PrimaryButton>
            </WorkflowVersionSidebarFooter>
        </WorkflowVersionSidebar>
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