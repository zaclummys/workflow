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
    defaultValue: '',
    markedAsInput: true,
    markedAsOutput: true,
};

export default function VariableForm ({
    variable = defaultVariable,
    onConfirm,
    onCancel,
}) {
    const [values, setValues] = useState(variable);

    const handleSubmit = event => {
        event.preventDefault();

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

        setValues(values => {
            switch (type) {
                case 'string':
                    return {
                        ...values,
                        defaultValue: '',
                    };

                case 'number':
                    return {
                        ...values,
                        defaultValue: '0',
                    };

                case 'boolean':
                    return {
                        ...values,
                        defaultValue: 'false',
                    };

                default:
                    return values;
            }
        });
    }

    const handleDefaultValueChange = (event) => {
        setValues(values => {
            switch (values.type) {
                case 'string':
                    return {
                        ...values,
                        defaultValue: event.target.value,
                    };

                case 'number':
                    return {
                        ...values,
                        defaultValue: event.target.value,
                    };

                case 'boolean':
                    return {
                        ...values,
                        defaultValue: event.target.value,
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
                <Label
                    htmlFor={defaultValueId}
                    disabled={values.defaultValue == null}
                >
                    Default Value
                </Label>

                <ValueFacade
                    id={defaultValueId}
                    type={values.type}
                    value={values.defaultValue}
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

            <div className="flex flex-row justify-between">
                <OutlineButton
                    onClick={handleCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton type="submit">
                    Confirm
                </PrimaryButton>
            </div>
        </Form>
    );
}