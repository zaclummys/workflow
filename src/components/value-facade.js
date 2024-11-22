import { Input, Select, Option } from '~/components/form';

export default function ValueFacade ({
    id,
    type,
    value,
    onChange,
}) {
    switch (type) {
        case 'string':
            return (
                <StringValue
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            );

        case 'number':
            return (
                <NumberValue
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            );

        case 'boolean':
            return (
                <BooleanValue
                    id={id}
                    value={value}
                    onChange={onChange}
                />
            );

        default:
            // throw new Error(`Unknown value type: ${value.type}`);
            return null;
    }
}

function StringValue ({ id, value, onChange }) {
    return (
        <Input
            id={id}
            value={value}
            onChange={onChange}
        />
    );
}

function NumberValue ({ id, value, onChange }) {
    return (
        <Input
            required
            id={id}
            type="number"
            value={value}
            onChange={onChange}
        />
    );
}

function BooleanValue ({ id, value, onChange }) {
    return (
        <Select
            required
            id={id}
            value={value}
            onChange={onChange}
        >
            <Option value="true">True</Option>
            <Option value="false">False</Option>
        </Select>
    );
}