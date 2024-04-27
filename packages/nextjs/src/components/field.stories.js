import Field from './field';

import Label from '~/components/label';
import Input from '~/components/input';
import Select from '~/components/select';
import Option from '~/components/option';
import Textarea from '~/components/textarea';

export const WithInput = {
    render: () => (
        <Field>
            <Label>Lorem ipsum</Label>

            <Input />
        </Field>
    )
};

export const WithSelect = {
    render: () => (
        <Field>
            <Label>Lorem ipsum</Label>

            <Select>
                <Option>Lorem ipsum 1</Option>
                <Option>Lorem ipsum 2</Option>
                <Option>Lorem ipsum 3</Option>
            </Select>
        </Field>
    )
};

export const WithTextArea = {
    render: () => (
        <Field>
            <Label>Lorem ipsum</Label>

            <Textarea />
        </Field>
    )
};

export default {
    component: Field,
};
