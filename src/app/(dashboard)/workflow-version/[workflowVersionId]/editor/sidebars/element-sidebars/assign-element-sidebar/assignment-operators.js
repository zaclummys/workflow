import {
    VALUE_STRING,
    VALUE_NUMBER,
    VALUE_BOOLEAN,
} from '~/core/domain/workflow-version/constants/values';

import {
    ASSIGNMENT_OPERATOR_SET,
    ASSIGNMENT_OPERATOR_NUMBER_INCREMENT,
    ASSIGNMENT_OPERATOR_NUMBER_DECREMENT,
    ASSIGNMENT_OPERATOR_NUMBER_MULTIPLY,
    ASSIGNMENT_OPERATOR_NUMBER_DIVIDE,
    ASSIGNMENT_OPERATOR_BOOLEAN_NOT,
    ASSIGNMENT_OPERATOR_NUMBER_REMAINDER,
} from '~/core/domain/workflow-version/constants/operators/assignment';

const assignmentOperators = [
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
];

export default assignmentOperators;