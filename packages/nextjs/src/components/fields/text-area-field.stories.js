import TextAreaField from './text-area-field';

export const Default = {
    args: {
        label: 'Lorem ipsum',
        placeholder: 'This is a placeholder.',
    }
};

export const Filled = {
    args: {
        label: 'Lorem ipsum',
        value: 'This input is filled.',
    }
};

export const Disabled = {
    args: {
        label: 'Lorem ipsum',
        value: 'This input is disabled.',
        disabled: true,
    }
};

export default {
    component: TextAreaField,
};
