import WorkflowExecutionContext from './workflow-execution-context';
import { WorkflowVersionRuntimeVariable } from './workflow-execution-context';

describe('Workflow Execution Context', () => {
    describe('String variable', () => {
        it('Should assign the value to the variable', () => {
            const workflowExecutionContext = new WorkflowExecutionContext({
                variables: [
                    {
                        id: 'variable-1',
                        type: 'string',
                        value: 'abc',
                    },
                ],
            });

            workflowExecutionContext.assignVariable({
                variableId: 'variable-1',
                operator: 'set',
                operand: {
                    type: 'value',
                    value: 'xyz',
                }
            });

            expect(workflowExecutionContext.getVariables()).toStrictEqual([
                new WorkflowVersionRuntimeVariable({
                    id: 'variable-1',
                    type: 'string',
                    value: 'xyz',
                }),
            ]);
        });

        it('Should compare the variable by an value', () => {
            const workflowExecutionContext = new WorkflowExecutionContext({
                variables: [
                    {
                        id: 'variable-1',
                        type: 'string',
                        value: 'abc',
                    },
                ],
            });

            const output = workflowExecutionContext.compareVariable({
                variableId: 'variable-1',
                operator: 'equal',
                operand: {
                    type: 'value',
                    value: 'abc',
                }
            });

            expect(output).toBe(true);
        });

        describe('Compare the variable by an value', () => {
            it('Should be equal', () => {
                const workflowExecutionContext = new WorkflowExecutionContext({
                    variables: [
                        {
                            id: 'variable-1',
                            type: 'string',
                            value: 'abc',
                        },
                    ],
                });

                const output = workflowExecutionContext.compareVariable({
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: 'abc',
                    }
                });

                expect(output).toBe(true);
            });

            it('Should be not equal', () => {
                const workflowExecutionContext = new WorkflowExecutionContext({
                    variables: [
                        {
                            id: 'variable-1',
                            type: 'string',
                            value: 'abc',
                        },
                    ],
                });

                const output = workflowExecutionContext.compareVariable({
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: 'xyz',
                    }
                });

                expect(output).toBe(false);
            });
        });

        describe('Compare the variable by another variable', () => {
            it('Should be equal', () => {
                const workflowExecutionContext = new WorkflowExecutionContext({
                    variables: [
                        {
                            id: 'variable-1',
                            type: 'string',
                            value: 'abc',
                        },

                        {
                            id: 'variable-2',
                            type: 'string',
                            value: 'abc',
                        },
                    ],
                });

                const output = workflowExecutionContext.compareVariable({
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-2',
                    }
                });

                expect(output).toBe(true);
            });

            it('Should be not equal', () => {
                const workflowExecutionContext = new WorkflowExecutionContext({
                    variables: [
                        {
                            id: 'variable-1',
                            type: 'string',
                            value: 'abc',
                        },

                        {
                            id: 'variable-2',
                            type: 'string',
                            value: 'xyz',
                        },
                    ],
                });

                const output = workflowExecutionContext.compareVariable({
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-2',
                    }
                });

                expect(output).toBe(false);
            });
        });
    });

    describe('Number variable', () => {
        it('Should assign the value to the variable', () => {
            const workflowExecutionContext = new WorkflowExecutionContext({
                variables: [
                    {
                        id: 'variable-1',
                        type: 'number',
                        value: 10,
                    },
                ],
            });

            workflowExecutionContext.assignVariable({
                variableId: 'variable-1',
                operator: 'set',
                operand: {
                    type: 'value',
                    value: 20,
                }
            });

            expect(workflowExecutionContext.getVariables()).toStrictEqual([
                new WorkflowVersionRuntimeVariable({
                    id: 'variable-1',
                    type: 'number',
                    value: 20,
                }),
            ]);
        });

        it('Should compare the variable by an value', () => {
            const workflowExecutionContext = new WorkflowExecutionContext({
                variables: [
                    {
                        id: 'variable-1',
                        type: 'number',
                        value: 10,
                    },
                ],
            });

            const output = workflowExecutionContext.compareVariable({
                variableId: 'variable-1',
                operator: 'equal',
                operand: {
                    type: 'value',
                    value: 10,
                }
            });

            expect(output).toBe(true);
        });

        it('Should compare the variable by another variable', () => {
            const workflowExecutionContext = new WorkflowExecutionContext({
                variables: [
                    {
                        id: 'variable-1',
                        type: 'number',
                        value: 10,
                    },

                    {
                        id: 'variable-2',
                        type: 'number',
                        value: 10,
                    },
                ],
            });

            const output = workflowExecutionContext.compareVariable({
                variableId: 'variable-1',
                operator: 'equal',
                operand: {
                    type: 'variable',
                    variableId: 'variable-2',
                }
            });

            expect(output).toBe(true);
        });
    });

    it('Should compare a variable by id', () => {
        const workflowExecutionContext = new WorkflowExecutionContext({
            variables: [
                {
                    id: 'variable-1',
                    type: 'string',
                    value: 'abc',
                },
            ],
        });

        const output = workflowExecutionContext.compareVariable({
            variableId: 'variable-1',
            operator: 'equal',
            operand: {
                type: 'value',
                value: 'abc',
            }
        });

        expect(output).toBe(true);
    });

    it('Should get output variables', () => {
        const workflowExecutionContext = new WorkflowExecutionContext({
            variables: [
                {
                    id: 'variable-1',
                    type: 'string',
                    value: 'abc',
                    markedAsOutput: true,
                },

                {
                    id: 'variable-2',
                    type: 'string',
                    value: 'xyz',
                    markedAsOutput: false,
                },
            ],
        });

        const variables = workflowExecutionContext.getOutputVariables();

        expect(variables).toStrictEqual([
            expect.objectContaining({
                id: 'variable-1',
            }),
        ]);
    });
});