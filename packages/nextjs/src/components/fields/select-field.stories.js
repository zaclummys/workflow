import SelectField from './select-field';

export const Default = {
    args: {
        label: 'Lorem ipsum',
        options: [
            {
                label: 'Dog',
                value: 'dog',
            },

            {
                label: 'Cat',
                value: 'cat',
            },

            {
                label: 'Bird',
                value: 'bird',
            },

            {
                label: 'Squirrel',
                value: 'squirrel',
            },
        ]
    }
};

export default {
    component: SelectField,
};
