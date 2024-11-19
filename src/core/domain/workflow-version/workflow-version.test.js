import {
    WorkflowVersion,
    WorkflowVariable,
    WorkflowStartElement,
    WorkflowIfElement,
    WorkflowAssignElement,
    WorkflowExecution,
} from './workflow-version';

describe('Workflow Version', () => {
    it('Should change the variables', async () => {
        const workflowVersion = WorkflowVersion.create({
            number: 1,
            workflowId: 'workflow-1',
            createdById: 'user-1',
        });

        workflowVersion.change({
            variables: [
                {
                    id: 'variable-string',
                    name: 'Variable String',
                    type: 'string',
                    defaultValue: 'abc',
                    markedAsInput: true,
                    markedAsOutput: false,
                },

                {
                    id: 'variable-number',
                    name: 'Variable Number',
                    type: 'number',
                    defaultValue: 123,
                    markedAsInput: false,
                    markedAsOutput: true,
                },

                {
                    id: 'variable-boolean',
                    name: 'Variable Boolean',
                    type: 'boolean',
                    defaultValue: true,
                    markedAsInput: true,
                    markedAsOutput: true,
                },
            ]
        });

        expect(workflowVersion.variables).toStrictEqual([
            new WorkflowVariable({
                id: 'variable-string',
                name: 'Variable String',
                type: 'string',
                defaultValue: 'abc',
                markedAsInput: true,
                markedAsOutput: false,
            }),

            new WorkflowVariable({
                id: 'variable-number',
                name: 'Variable Number',
                type: 'number',
                defaultValue: 123,
                markedAsInput: false,
                markedAsOutput: true,
            }),

            new WorkflowVariable({
                id: 'variable-boolean',
                name: 'Variable Boolean',
                type: 'boolean',
                defaultValue: true,
                markedAsInput: true,
                markedAsOutput: true,
            }),
        ]);
    });

    it('Should change the elements', async () => {
        const workflowVersion = WorkflowVersion.create({
            number: 1,
            workflowId: 'workflow-1',
            createdById: 'user-1',
        });

        workflowVersion.change({
            elements: [
                {
                    id: 'start',
                    type: 'start',
                    positionX: 0,
                    positionY: 0,
                    nextElementId: 'assign-1',
                },

                {
                    id: 'if-1',
                    type: 'if',
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                    positionX: 0,
                    positionY: 0,
                },

                {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign 1',
                    description: 'This is an assign element.',
                    assignments: [],
                    positionX: 0,
                    positionY: 0,
                },
            ],
        });

        expect(workflowVersion.elements).toStrictEqual([
            new WorkflowStartElement({
                id: 'start',
                positionX: 0,
                positionY: 0,
                nextElementId: 'assign-1',
            }),

            new WorkflowIfElement({
                id: 'if-1',
                name: 'If 1',
                description: 'This is an if element.',
                strategy: 'all',
                conditions: [],
                positionX: 0,
                positionY: 0,
            }),

            new WorkflowAssignElement({
                id: 'assign-1',
                name: 'Assign 1',
                description: 'This is an assign element.',
                assignments: [],
                positionX: 0,
                positionY: 0,
            }),
        ]);
    });

    describe('Execution', () => {
        it('Should execute when there is only the start element', () => {
            const workflowVersion = new WorkflowVersion({
                id: 'workflow-version-1',
                status: 'active',
                variables: [],
                elements: [
                    {
                        id: 'start',
                        type: 'start',
                        positionX: 0,
                        positionY: 0,
                    },
                ],
                number: 1,
                workflowId: 'workflow-1',
                createdAt: new Date(),
                createdById: 'user-1',
            });

            const execution = workflowVersion.execute({
                inputs: [],
                userId: 'user-1',
            });

            expect(execution).toStrictEqual(new WorkflowExecution({
                id: expect.any(String),
                inputs: [],
                outputs: [],
                workflowVersionId: workflowVersion.id,
                executedById: 'user-1',
            }));
        });

        it('Should execute with an assign element', () => {
            const workflowVersion = new WorkflowVersion({
                id: 'workflow-version-1',
                status: 'active',
                variables: [
                    {
                        id: 'variable-string',
                        name: 'Variable String',
                        type: 'string',
                        defaultValue: 'abc',
                        markedAsInput: false,
                        markedAsOutput: true,
                    },

                    {
                        id: 'variable-number',
                        name: 'Variable Number',
                        type: 'number',
                        defaultValue: 123,
                        markedAsInput: false,
                        markedAsOutput: true,
                    },

                    {
                        id: 'variable-boolean',
                        name: 'Variable Boolean',
                        type: 'boolean',
                        defaultValue: true,
                        markedAsInput: false,
                        markedAsOutput: true,
                    },
                ],
                elements: [
                    {
                        id: 'start',
                        type: 'start',
                        positionX: 0,
                        positionY: 0,
                        nextElementId: 'assign-1',
                    },

                    {
                        id: 'assign-1',
                        type: 'assign',
                        name: 'Assign 1',
                        description: 'This is an assign element.',
                        assignments: [
                            {
                                id: 'assignment-1',
                                variableId: 'variable-string',
                                operator: 'set',
                                operand: {
                                    type: 'value',
                                    value: {
                                        type: 'string',
                                        string: 'xyz',
                                    }
                                }
                            },

                            {
                                id: 'assignment-2',
                                variableId: 'variable-number',
                                operator: 'set',
                                operand: {
                                    type: 'value',
                                    value: {
                                        type: 'number',
                                        number: 456,
                                    }
                                }
                            },

                            {
                                id: 'assignment-3',
                                variableId: 'variable-boolean',
                                operator: 'set',
                                operand: {
                                    type: 'value',
                                    value: {
                                        type: 'boolean',
                                        boolean: false,
                                    }
                                },
                            }
                        ],
                        positionX: 0,
                        positionY: 0,
                    },
                ],
                number: 1,
                workflowId: 'workflow-1',
                createdAt: new Date(),
                createdById: 'user-1',
            });

            const execution = workflowVersion.execute({
                inputs: [],
                userId: 'user-1',
            });

            expect(execution).toStrictEqual(new WorkflowExecution({
                id: expect.any(String),
                inputs: [],
                outputs: [
                    {
                        id: 'variable-string',
                        value: {
                            type: 'string',
                            string: 'xyz',
                        },
                    },

                    {
                        id: 'variable-number',
                        value: {
                            type: 'number',
                            number: 456,
                        },
                    },

                    {
                        id: 'variable-boolean',
                        value: {
                            type: 'boolean',
                            boolean: false,
                        },
                    },
                ],
                workflowVersionId: workflowVersion.id,
                executedById: 'user-1',
            }));
        });

        it('Should execute with an if element', () => {
            const workflowVersion = new WorkflowVersion({
                id: 'workflow-version-1',
                status: 'active',
                number: 1,
                workflowId: 'workflow-1',
                createdAt: new Date(),
                createdById: 'user-1',

                variables: [
                    {
                        id: 'variable-boolean',
                        name: 'Variable Boolean',
                        type: 'boolean',
                        defaultValue: true,
                        markedAsInput: false,
                        markedAsOutput: false,
                    }
                ],

                elements: [
                    {
                        id: 'start',
                        type: 'start',
                        positionX: 0,
                        positionY: 0,
                        nextElementId: 'if-1',
                    },

                    {
                        id: 'if-1',
                        type: 'if',
                        name: 'If 1',
                        description: 'This is an if element.',
                        strategy: 'all',
                        conditions: [
                            {
                                id: 'condition-1',
                                variableId: 'variable-boolean',
                                operator: 'equal',
                                operand: {
                                    type: 'value',
                                    value: true,
                                }
                            }
                        ],
                        positionX: 0,
                        positionY: 0,
                    },
                ],
            });

            const execution = workflowVersion.execute({
                inputs: [],
                userId: 'user-1',
            });

            expect(execution).toStrictEqual(new WorkflowExecution({
                id: expect.any(String),
                inputs: [],
                outputs: [],
                workflowVersionId: workflowVersion.id,
                executedById: 'user-1',
            }));
        });

        it('Should execute with an if element with two branches', () => {
            const workflowVersion = new WorkflowVersion({
                id: 'workflow-version-1',
                status: 'active',
                number: 1,
                workflowId: 'workflow-1',
                createdAt: new Date(),
                createdById: 'user-1',

                variables: [
                    {
                        id: 'variable-boolean',
                        name: 'Variable Boolean',
                        type: 'boolean',
                        defaultValue: true,
                        markedAsInput: false,
                        markedAsOutput: false,
                    },

                    {
                        id: 'variable-string',
                        name: 'Variable String',
                        type: 'string',
                        defaultValue: 'not assigned',
                        markedAsInput: false,
                        markedAsOutput: true,
                    },
                ],

                elements: [
                    {
                        id: 'start',
                        type: 'start',
                        positionX: 0,
                        positionY: 0,
                        nextElementId: 'if-1',
                    },

                    {
                        id: 'if-1',
                        type: 'if',
                        name: 'If 1',
                        description: 'This is an if element.',
                        strategy: 'all',
                        conditions: [
                            {
                                id: 'condition-1',
                                variableId: 'variable-boolean',
                                operator: 'equal',
                                operand: {
                                    type: 'value',
                                    value: true,
                                }
                            }
                        ],
                        positionX: 0,
                        positionY: 0,
                        nextElementIdIfTrue: 'assign-satisfied',
                        nextElementIdIfFalse: 'assign-not-satisfied',
                    },

                    {
                        id: 'assign-satisfied',
                        type: 'assign',
                        name: 'Assign Satisfied',
                        description: 'This is an assign element.',
                        assignments: [
                            {
                                id: 'assignment-1',
                                variableId: 'variable-string',
                                operator: 'set',
                                operand: {
                                    type: 'value',
                                    value: 'satisfied',
                                }
                            }
                        ],
                        positionX: 0,
                        positionY: 0,
                    },

                    {
                        id: 'assign-not-satisfied',
                        type: 'assign',
                        name: 'Assign Not Satisfied',
                        description: 'This is an assign element.',
                        assignments: [
                            {
                                id: 'assignment-1',
                                variableId: 'variable-string',
                                operator: 'set',
                                operand: {
                                    type: 'value',
                                    value: 'not-satisfied',
                                }
                            }
                        ],
                        positionX: 0,
                        positionY: 0,
                    },
                ],
            });

            const execution = workflowVersion.execute({
                inputs: [],
                userId: 'user-1',
            });

            expect(execution).toStrictEqual(new WorkflowExecution({
                id: expect.any(String),
                inputs: [],
                outputs: [
                    {
                        id: 'variable-string',
                        value: 'satisfied',
                    }
                ],
                workflowVersionId: workflowVersion.id,
                executedById: 'user-1',
            }));
        });
    });
});