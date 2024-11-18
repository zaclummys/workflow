import {
    fromValue,
    fromWorkflowOperand,
    fromWorkflowVariable,
    fromWorkflowIfElement,
    fromWorkflowCondition,
    fromWorkflowAssignment,
} from '~/core/data/mongodb/workflow-version';

import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';
import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';
import WorkflowCondition from '~/core/domain/workflow-version/elements/if/workflow-condition';
import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';
import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';
import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';
import WorkflowBooleanValue from '~/core/domain/workflow-version/values/workflow-boolean-value';
import WorkflowVariableOperand from '~/core/domain/workflow-version/operands/workflow-variable-operand';
import WorkflowValueOperand from '~/core/domain/workflow-version/operands/workflow-value-operand';

describe('Workflow Version', () => {
    describe('Given a Workflow Number Value', () => {
        it('Should convert', () => {
            const output = fromValue(new WorkflowNumberValue(123));

            expect(output).toEqual({
                type: 'number',
                number: 123,
            });
        });
    });

    describe('Given a Workflow String Value', () => {
        it('Should convert', () => {
            const output = fromValue(new WorkflowStringValue('abc'));

            expect(output).toEqual({
                type: 'string',
                string: 'abc',
            });
        });
    });

    describe('Given a Workflow Boolean Value', () => {
        it('Should convert', () => {
            const output = fromValue(new WorkflowBooleanValue(true));

            expect(output).toEqual({
                type: 'boolean',
                boolean: true,
            });
        });
    });

    describe('Given a Workflow Variable Operand', () => {
        it('Should convert', () => {
            const operand = new WorkflowVariableOperand('1');

            const output = fromWorkflowOperand(operand);

            expect(output).toEqual({
                type: 'variable',
                variableId: '1',
            });
        });
    });

    describe('Given a Workflow Value Operand', () => {
        describe('When value is a number', () => {
            it('Should convert', () => {
                const operand = new WorkflowValueOperand({
                    type: 'number',
                    number: 123,
                });

                const output = fromWorkflowOperand(operand);

                expect(output).toEqual({
                    type: 'value',
                    value: {
                        type: 'number',
                        number: 123,
                    }
                });
            });
        });

        describe('When value is a string', () => {
            it('Should convert', () => {
                const operand = new WorkflowValueOperand({
                    type: 'string',
                    string: 'abc',
                });

                const output = fromWorkflowOperand(operand);

                expect(output).toEqual({
                    type: 'value',
                    value: {
                        type: 'string',
                        string: 'abc',
                    }
                });
            });
        });

        describe('When value is a boolean', () => {
            it('Should convert', () => {
                const operand = new WorkflowValueOperand({
                    type: 'boolean',
                    boolean: true,
                });

                const output = fromWorkflowOperand(operand);

                expect(output).toEqual({
                    type: 'value',
                    value: {
                        type: 'boolean',
                        boolean: true,
                    }
                });
            });
        });
    });

    describe('Given a Workflow Assignment', () => {
        describe('And operand is a variable', () => {
            it('Should convert', () => {
                const output = fromWorkflowAssignment(new WorkflowAssignment({
                    id: '1',
                    variableId: '2',
                    operator: 'set',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    },
                }));

                expect(output).toEqual({
                    id: '1',
                    operator: 'set',
                    variableId: '2',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    }
                });
            });
        });

        describe('And operand is a value', () => {
            it('Should convert', () => {
                const output = fromWorkflowAssignment(new WorkflowAssignment({
                    id: '1',
                    variableId: '2',
                    operator: 'set',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 123,
                        }
                    },
                }));

                expect(output).toEqual({
                    id: '1',
                    operator: 'set',
                    variableId: '2',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 123,
                        }
                    }
                });
            });
        });
    });

    describe('Given a Workflow Condition', () => {
        describe('When operand is a variable', () => {
            it('Should convert', () => {
                const condition = new WorkflowCondition({
                    id: '1',
                    variableId: '2',
                    variableType: 'number',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    }
                });

                const output = fromWorkflowCondition(condition);
    
                expect(output).toEqual({
                    id: '1',
                    variableId: '2',
                    variableType: 'number',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: '3',
                    }
                });
            });
        });
    });

    describe('Given a Workflow If Element', () => {
        describe('And strategy is all', () => {
            it('Should convert', () => {
                const output = fromWorkflowIfElement(new WorkflowIfElement({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    strategy: 'all',
                    conditions: [],
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                }));

                expect(output).toEqual({
                    id: '1',
                    type: 'if',
                    name: 'Name',
                    description: 'Description',
                    conditions: [],
                    strategy: 'all',
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                });
            });
        });

        describe('And strategy is any', () => {
            it('Should convert', () => {
                const output = fromWorkflowIfElement(new WorkflowIfElement({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    strategy: 'any',
                    conditions: [],
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                }));

                expect(output).toEqual({
                    id: '1',
                    type: 'if',
                    name: 'Name',
                    description: 'Description',
                    conditions: [],
                    strategy: 'any',
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                });
            });
        });

        describe('And it has conditions', () => {
            it('Should convert', () => {
                const output = fromWorkflowIfElement(new WorkflowIfElement({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    strategy: 'any',
                    conditions: [
                        {
                            id: '2',
                            variableId: '3',
                            variableType: 'number',
                            operator: 'equal',
                            operand: {
                                type: 'value',
                                value: {
                                    type: 'number',
                                    number: 123,
                                }
                            }
                        }
                    ],
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                }));

                expect(output).toEqual({
                    id: '1',
                    type: 'if',
                    name: 'Name',
                    description: 'Description',
                    conditions: [
                        {
                            id: '2',
                            variableId: '3',
                            variableType: 'number',
                            operator: 'equal',
                            operand: {
                                type: 'value',
                                value: {
                                    type: 'number',
                                    number: 123,
                                }
                            }
                        }
                    ],
                    strategy: 'any',
                    nextElementIdIfTrue: '2',
                    nextElementIdIfFalse: '3',
                    positionX: 1,
                    positionY: 2,
                });
            });
        });
    });

    describe('Given a Workflow Variable', () => {
        describe('When there is no default value', () => {
            it('Should convert', () => {
                const variable = new WorkflowVariable({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    type: 'string',
                    defaultValue: null,
                    markedAsInput: true,
                    markedAsOutput: true,
                });

                const output = fromWorkflowVariable(variable);

                expect(output).toEqual({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    type: 'string',
                    defaultValue: null,
                    markedAsInput: true,
                    markedAsOutput: true,
                });
            });
        });

        describe('When there is default value', () => {
            it('Should convert', () => {
                const variable = new WorkflowVariable({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    type: 'string',
                    defaultValue: {
                        type: 'string',
                        string: 'abc',
                    },
                    markedAsInput: true,
                    markedAsOutput: true,
                });

                const output = fromWorkflowVariable(variable);

                expect(output).toEqual({
                    id: '1',
                    name: 'Name',
                    description: 'Description',
                    type: 'string',
                    defaultValue: {
                        type: 'string',
                        string: 'abc',
                    },
                    markedAsInput: true,
                    markedAsOutput: true,
                });
            });
        });
    });
});