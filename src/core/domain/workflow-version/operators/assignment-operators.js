import {
    VALUE_STRING,
    VALUE_NUMBER,
    VALUE_BOOLEAN,
} from '~/core/domain/workflow-version/values';

export const ASSIGNMENT_OPERATOR_SET = 'set';

export const ASSIGNMENT_OPERATOR_NUMBER_INCREMENT = 'increment';
export const ASSIGNMENT_OPERATOR_NUMBER_DECREMENT = 'decrement';
export const ASSIGNMENT_OPERATOR_NUMBER_MULTIPLY = 'multiply';
export const ASSIGNMENT_OPERATOR_NUMBER_DIVIDE = 'divide';
export const ASSIGNMENT_OPERATOR_NUMBER_REMAINDER = 'remainder';

export const ASSIGNMENT_OPERATOR_BOOLEAN_NOT = 'not';
export const ASSIGNMENT_OPERATOR_STRING_CONCATENATE = 'concatenate';

export const assignmentOperators = [
    {
        name: ASSIGNMENT_OPERATOR_SET,
        label: 'Set',
        supports: [VALUE_STRING, VALUE_NUMBER, VALUE_BOOLEAN],
    },

    {
        name: ASSIGNMENT_OPERATOR_NUMBER_INCREMENT,
        label: 'Increment By',
        supports: [VALUE_NUMBER],
    },

    {
        name: ASSIGNMENT_OPERATOR_NUMBER_DECREMENT,
        label: 'Decrement By',
        supports: [VALUE_NUMBER],
    },

    {
        name: ASSIGNMENT_OPERATOR_NUMBER_MULTIPLY,
        label: 'Multiply By',
        supports: [VALUE_NUMBER],
    },

    {
        name: ASSIGNMENT_OPERATOR_NUMBER_DIVIDE,
        label: 'Divide By',
        supports: [VALUE_NUMBER],
    },

    {
        name: ASSIGNMENT_OPERATOR_NUMBER_REMAINDER,
        label: 'Remainder By',
        supports: [VALUE_NUMBER],
    },

    {
        name: ASSIGNMENT_OPERATOR_BOOLEAN_NOT,
        label: 'Not',
        supports: [VALUE_BOOLEAN],
    },

    {
        name: ASSIGNMENT_OPERATOR_STRING_CONCATENATE,
        label: 'Concatenate',
        supports: [VALUE_STRING],
    }
];