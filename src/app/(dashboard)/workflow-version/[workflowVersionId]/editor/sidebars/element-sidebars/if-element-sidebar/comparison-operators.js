import {
    VALUE_STRING,
    VALUE_NUMBER,
    VALUE_BOOLEAN,
} from '~/core/domain/workflow-version/constants/values';

import {
    COMPARISON_OPERATOR_EQUAL,
    COMPARISON_OPERATOR_NUMBER_GREATER_THAN,
    COMPARISON_OPERATOR_NUMBER_LESS_THAN,
    COMPARISON_OPERATOR_NUMBER_GREATER_THAN_OR_EQUAL_TO,
    COMPARISON_OPERATOR_NUMBER_LESS_THAN_OR_EQUAL_TO,
    COMPARISON_OPERATOR_BOOLEAN_AND,
    COMPARISON_OPERATOR_BOOLEAN_OR,
    COMPARISON_OPERATOR_STRING_CONTAINS,
    COMPARISON_OPERATOR_STRING_IS_CONTAINED,
} from '~/core/domain/workflow-version/constants/operators/comparison';

const comparisonOperators = [
    {
        name: COMPARISON_OPERATOR_EQUAL,
        label: 'Equal',
        supports: [VALUE_STRING, VALUE_NUMBER, VALUE_BOOLEAN],
    },

    {
        name: COMPARISON_OPERATOR_NUMBER_GREATER_THAN,
        label: 'Greater Than',
        supports: [VALUE_NUMBER],
    },

    {
        name: COMPARISON_OPERATOR_NUMBER_LESS_THAN,
        label: 'Less Than',
        supports: [VALUE_NUMBER],
    },

    {
        name: COMPARISON_OPERATOR_NUMBER_GREATER_THAN_OR_EQUAL_TO,
        label: 'Greater Than Or Equal To',
        supports: [VALUE_NUMBER],
    },

    {
        name: COMPARISON_OPERATOR_NUMBER_LESS_THAN_OR_EQUAL_TO,
        label: 'Less Than Or Equal To',
        supports: [VALUE_NUMBER],
    },

    {
        name: COMPARISON_OPERATOR_BOOLEAN_AND,
        label: 'And',
        supports: [VALUE_BOOLEAN],
    },

    {
        name: COMPARISON_OPERATOR_BOOLEAN_OR,
        label: 'Or',
        supports: [VALUE_BOOLEAN],
    },

    {
        name: COMPARISON_OPERATOR_STRING_CONTAINS,
        label: 'Contains',
        supports: [VALUE_STRING],
    },

    {
        name: COMPARISON_OPERATOR_STRING_IS_CONTAINED,
        label: 'Is contained',
        supports: [VALUE_STRING],
    },
];

export default comparisonOperators;