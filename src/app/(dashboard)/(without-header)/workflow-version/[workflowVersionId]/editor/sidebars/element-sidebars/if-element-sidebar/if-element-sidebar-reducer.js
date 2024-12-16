export default function ifElementReducer (ifElement, action) {
    switch (action.type) {
        case 'name-changed':
            return {
                ...ifElement,
                name: action.name,
            };

        case 'description-changed':
            return {
                ...ifElement,
                description: action.description,
            };

        case 'strategy-changed':
            return {
                ...ifElement,
                strategy: action.strategy,
            };

        case 'condition-added':
        case 'condition-variable-changed':
        case 'condition-operator-changed':
        case 'condition-operand-type-changed':
        case 'condition-operand-variable-changed':
        case 'condition-operand-value-changed':
        case 'condition-removed':
            return {
                ...ifElement,
                conditions: conditionsReducer(ifElement.conditions, action),
            };

        default:
            return ifElement;
    }
}

function conditionsReducer (conditions, action) {
    switch (action.type) {
        case 'condition-added':
            return conditions.concat({
                id: action.conditionId,
                variableId: action.variableId,
                operator: 'equal',
                operand: {
                    type: 'variable',
                    variableId: action.variableId,
                },
            });

        case 'condition-variable-changed':
            return conditions.map(condition => {
                if (condition.id === action.conditionId) {
                    return {
                        ...condition,
                        variableId: action.variableId,
                        operator: 'equal',
                        operand: {
                            type: 'variable',
                            variableId: action.variableId,
                        },
                    };
                } else {
                    return condition;
                }
            });

        case 'condition-operator-changed':
            return conditions.map(condition => {
                if (condition.id === action.conditionId) {
                    return {
                        ...condition,
                        operator: action.operator,
                    };
                } else {
                    return condition;
                }
            });

        case 'condition-operand-type-changed':
            return conditions.map(condition => {
                if (condition.id === action.conditionId) {
                    switch (action.operandType) {
                        case 'variable':
                            return {
                                ...condition,
                                operand: {
                                    type: 'variable',
                                    variableId: condition.variableId,
                                }
                            };

                        case 'value':
                            switch (action.variableType) {
                                case 'string':
                                    return {
                                        ...condition,
                                        operand: {
                                            type: 'value',
                                            value: '',
                                        }
                                    };

                                case 'number':
                                    return {
                                        ...condition,
                                        operand: {
                                            type: 'value',
                                            value: '0',
                                        }
                                    };

                                case 'boolean':
                                    return {
                                        ...condition,
                                        operand: {
                                            type: 'value',
                                            value: 'false',
                                        }
                                    };

                                default:
                                    return condition;
                            }

                        default:
                            return condition;
                    }
                } else {
                    return condition;
                }
            });

        case 'condition-operand-variable-changed':
            return conditions.map(condition => {
                if (condition.id === action.conditionId) {
                    return {
                        ...condition,
                        operand: {
                            ...condition.operand,
                            variableId: action.operandVariableId,
                        },
                    }
                } else {
                    return condition;
                }
            });

        case 'condition-operand-value-changed':
            return conditions.map(condition => {
                if (condition.id === action.conditionId) {
                    return {
                        ...condition,
                        operand: {
                            ...condition.operand,
                            value: action.value,
                        },
                    };
                } else {
                    return condition;
                }
            });

        case 'condition-removed':
            return conditions.filter(condition => {
                return condition.id !== action.conditionId;
            });

        default:
            return conditions;
    }
}