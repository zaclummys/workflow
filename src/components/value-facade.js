import { Input, Select, Option } from '~/components/form';

export default function ValueFacade ({
    id,
    value,
    onChange,
}) {
    switch (value.type) {
        case 'string':
            return (
                <StringValue
                    id={id}
                    string={value.string}
                    onChange={onChange}
                />
            );

        case 'number':
            return (
                <NumberValue
                    id={id}
                    number={value.number}
                    onChange={onChange}
                />
            );

        case 'boolean':
            return (
                <BooleanValue
                    id={id}
                    boolean={value.boolean}
                    onChange={onChange}
                />
            );

        default:
            return null;
    }
}

function StringValue ({ id, string, onChange }) {
    return (
        <Input
            id={id}
            value={string}
            onChange={onChange}
        />
    );
}

function NumberValue ({ id, number, onChange }) {
    return (
        <Input
            id={id}
            type="number"
            value={number}
            onChange={onChange}
        />
    );
}

function BooleanValue ({ id, boolean, onChange }) {
    return (
        <Select
            id={id}
            required
            value={boolean}
            onChange={onChange}
        >
            <Option value="true">True</Option>
            <Option value="false">False</Option>
        </Select>
    );
}