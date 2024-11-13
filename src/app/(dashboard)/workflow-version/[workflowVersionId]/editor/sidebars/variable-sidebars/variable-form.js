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
    createValue,
    coerceValue,
    decoerceValue,
} from '../value';
import ValueFacade from '~/components/value';

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
        defaultValue: decoerceValue(initialValues?.defaultValue),
    });

    const variableHasNotInitialValue = values.defaultValue == null && !values.markedAsInput;

    const handleFormSubmit = event => {
        event.preventDefault();

        if (variableHasNotInitialValue) {
            return;
        }
        
        const submitValues = {
            ...values,
            defaultValue: coerceValue(values.defaultValue),
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
            defaultValue: values.defaultValue === null ? null : createValue({ type }),
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
            defaultValue: createValue({
                type: values.type
            }),
        }));
    };

    const handleDefaultValueChange = (event) => {
        setValues(values => ({
            ...values,
            defaultValue: createValue({
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
