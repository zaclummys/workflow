import { Input, Select, Option } from '~/components/form';

export default function ValueFacade ({ value, onChange }) {
    switch (value.type) {
        case 'string':
            return (
                <StringValue
                    string={value.string}
                    onChange={onChange}
                />
            );

        case 'number':
            return (
                <NumberValue
                    number={value.number}
                    onChange={onChange}
                />
            );

        case 'boolean':
            return (
                <BooleanValue
                    boolean={value.boolean}
                    onChange={onChange}
                />
            );

        default:
            throw new Error(`Unsupported value type: ${value.type}`);
    }
}

function StringValue ({ string, onChange }) {
    return (
        <Input
            value={string}
            onChange={onChange}
        />
    );
}

function NumberValue ({ number, onChange }) {
    return (
        <Input
            type="number"
            value={number}
            onChange={onChange}
        />
    );
}

function BooleanValue ({ boolean, onChange }) {
    return (
        <Select
            value={boolean}
            onChange={onChange}
        >
            <Option value="true">True</Option>
            <Option value="false">False</Option>
        </Select>
    );
}