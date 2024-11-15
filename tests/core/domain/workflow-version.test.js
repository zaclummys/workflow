import {
    WorkflowVersion,
} from '~/core/domain/workflow-version';

import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';
import WorkflowExecutionVariable from '~/core/domain/workflow-execution/workflow-execution-variable';

import WorkflowAssignElement from '~/core/domain/workflow-version/elements/assign/workflow-assign-element';
import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';

import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';

import {
    WorkflowValueOperand,
    WorkflowVariableOperand,
} from '~/core/domain/workflow-version/operands/workflow-operand';

import WorkflowStartElement from '~/core/domain/workflow-version/elements/start/workflow-start-element';

import { WorkflowExecutionOutput } from '~/core/domain/workflow-execution';
import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';

const createWorkflowVersion = ({
    status,
    elements = [
        new WorkflowStartElement({
            id: 'start',
            positionX: 0,
            positionY: 0,
            nextElementId: null,
        }),
    ],
    variables = [],
}) => {
    return new WorkflowVersion({
        status,
        variables,
        elements,
        id: 'workflow-version-1',
        number: 1,
        workflowId: 'workflow-1',
        createdById: 'user-1',
        createdAt: new Date(),
    });
};

describe('Workflow Version', () => {
    describe('Change Workflow Version', () => {
        describe('Change elements', () => {
            it('Should change the elements', () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'draft',
                    elements: [
                        new WorkflowStartElement({
                            id: 'start',
                            positionX: 0,
                            positionY: 0,
                            nextElementId: null,
                        }),
                    ],
                });

                const newElements = [
                    {
                        type: 'start',
                        id: 'start',
                        positionX: 0,
                        positionY: 0,
                        nextElementId: 'assign-1',
                    },

                    {
                        type: 'assign',
                        id: 'assign-1',
                        name: 'Assign 1',
                        description: '',
                        positionX: 100,
                        positionY: 0,
                        assignments: [],
                        nextElementId: null,
                    },
                ];

                workflowVersion.change({
                    variables: [],
                    elements: newElements,
                });

                expect(workflowVersion.elements).toStrictEqual([
                    new WorkflowStartElement({
                        id: 'start',
                        positionX: 0,
                        positionY: 0,
                        nextElementId: 'assign-1',
                    }),

                    new WorkflowAssignElement({
                        id: 'assign-1',
                        name: 'Assign 1',
                        description: '',
                        positionX: 100,
                        positionY: 0,
                        assignments: [],
                        nextElementId: null,
                    }),
                ]);
            });
        });

        describe('Change variables', () => {
            it('Should change the variables', () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'draft',
                    variables: [],
                });

                const newVariables = [
                    {
                        id: 'variable',
                        name: 'Variable',
                        type: 'string',
                        defaultValue: {
                            type: 'string',
                            string: 'abc',
                        },
                        markedAsInput: false,
                        markedAsOutput: false,
                    }
                ];

                workflowVersion.change({
                    variables: newVariables,
                    elements: [],
                });

                expect(workflowVersion.variables).toStrictEqual([
                    new WorkflowVariable({
                        id: 'variable',
                        name: 'Variable',
                        type: 'string',
                        defaultValue: {
                            type: 'string',
                            string: 'abc',
                        },
                        markedAsInput: false,
                        markedAsOutput: false,
                    }),
                ]);
            });
        });
    });

    describe('Fill Execution Variables', () => {
        describe('When variable has default value', () => {
            describe('And variable is marked as input', () => {
                describe('And input is provided', () => {
                   it('Should fill the variable with the input value', () => {
                        const workflowVersion = createWorkflowVersion({
                            status: 'active',
                            variables: [
                                new WorkflowVariable({
                                    id: 'variable',
                                    name: 'Variable',
                                    type: 'string',
                                    defaultValue: {
                                        type: 'string',
                                        string: 'abc',
                                    },
                                    markedAsInput: true,
                                    markedAsOutput: false,
                                }),
                            ],
                        });

                        const variables = workflowVersion.fillExecutionVariables([
                            {
                                variableId: 'variable',
                                value: 'xyz',
                            }
                        ]);

                        expect(variables).toStrictEqual([
                            new WorkflowExecutionVariable({
                                variableId: 'variable',
                                value: 'xyz',
                            }),
                        ]);
                   });
                });

                describe('And input is missing', () => {
                    it('Should fill the variable with the default value', () => {
                        const workflowVersion = createWorkflowVersion({
                            status: 'active',
                            variables: [
                                new WorkflowVariable({
                                    id: 'variable',
                                    name: 'Variable',
                                    type: 'string',
                                    defaultValue: {
                                        type: 'string',
                                        string: 'abc',
                                    },
                                    markedAsInput: true,
                                    markedAsOutput: false,
                                }),
                            ],
                        });

                        const variables = workflowVersion.fillExecutionVariables([]);

                        expect(variables).toStrictEqual([
                            new WorkflowExecutionVariable({
                                variableId: 'variable',
                                value: new WorkflowStringValue('abc'),
                            }),
                        ]);
                    });
                });
            });

            describe('And variable is not marked as input', () => {
                describe('And input is provided', () => {
                    it('Should throw an error', () => {
                        const workflowVersion = createWorkflowVersion({
                            status: 'active',
                            variables: [
                                new WorkflowVariable({
                                    id: 'variable-1',
                                    name: 'Variable 1',
                                    type: 'string',
                                    defaultValue: {
                                        type: 'string',
                                        string: 'abc',
                                    },
                                    markedAsInput: false,
                                    markedAsOutput: false,
                                }),
                            ],
                        });

                        expect(() => {
                            workflowVersion.fillExecutionVariables([
                                {
                                    variableId: 'variable-1',
                                    value: 'xyz',
                                }
                            ]);
                        }).toThrow('Variable \'Variable 1\' is not marked as input');
                    });
                });

                describe('And input is missing', () => {
                    it('Should fill the variable with the default value', () => {
                        const workflowVersion = createWorkflowVersion({
                            status: 'active',
                            variables: [
                                new WorkflowVariable({
                                    id: 'variable',
                                    name: 'Variable',
                                    type: 'string',
                                    defaultValue: {
                                        type: 'string',
                                        string: 'abc',
                                    },
                                    markedAsInput: false,
                                    markedAsOutput: false,
                                }),
                            ],
                        });

                        const variables = workflowVersion.fillExecutionVariables([]);

                        expect(variables).toStrictEqual([
                            new WorkflowExecutionVariable({
                                variableId: 'variable',
                                value: new WorkflowStringValue('abc'),
                            }),
                        ]);
                    });
                });
            });
        });
        
        describe('When variable does not have default value and variable is marked as input', () => {
            describe('And input is provided', () => {
                it('Should fill the variable with the input value', () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        variables: [
                            new WorkflowVariable({
                                id: 'variable',
                                name: 'Variable',
                                type: 'string',
                                defaultValue: null,
                                markedAsInput: true,
                                markedAsOutput: false,
                            }),
                        ],
                    });

                    const variables = workflowVersion.fillExecutionVariables([
                        {
                            variableId: 'variable',
                            value: 'xyz',
                        }
                    ]);

                    expect(variables).toStrictEqual([
                        new WorkflowExecutionVariable({
                            variableId: 'variable',
                            value: 'xyz',
                        }),
                    ]);
                });
            });

            describe('And input is missing', () => {
                it('Should throw an error', () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        variables: [
                            new WorkflowVariable({
                                id: 'variable-1',
                                name: 'Variable 1',
                                type: 'string',
                                defaultValue: null,
                                markedAsInput: true,
                                markedAsOutput: false,
                            }),
                        ],
                    });

                    expect(() => {
                        workflowVersion.fillExecutionVariables([]);
                    }).toThrow('Input value for variable \'Variable 1\' is required.');
                });
            });
        });

        describe('When input is provided for a variable that does not exist', () => {
            it('Should throw an error', () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'active',
                    variables: [],
                });

                expect(() => {
                    workflowVersion.fillExecutionVariables([
                        {
                            variableId: 'variable-1',
                            value: 'xyz',
                        }
                    ]);
                }).toThrow('Variable \'variable-1\' does not exist');
            });
        });

        describe('When input is provided for a variable that is not marked as input', () => {
            it('Should throw an error', () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'active',
                    variables: [
                        new WorkflowVariable({
                            id: 'variable-1',
                            name: 'Variable 1',
                            type: 'string',
                            defaultValue: {
                                type: 'string',
                                string: 'abc',
                            },
                            markedAsInput: false,
                            markedAsOutput: false,
                        }),
                    ],
                });

                expect(() => {
                    workflowVersion.fillExecutionVariables([
                        {
                            variableId: 'variable-1',
                            value: 'xyz',
                        }
                    ]);
                }).toThrow('Variable \'Variable 1\' is not marked as input');
            });
        });

        describe('When variable is a string', () => {
            describe('And input is a string', () => {
                it('Should fill the variable with the input value', () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        variables: [
                            new WorkflowVariable({
                                id: 'variable',
                                name: 'Variable',
                                type: 'string',
                                defaultValue: null,
                                markedAsInput: true,
                                markedAsOutput: false,
                            }),
                        ],
                    });

                    const variables = workflowVersion.fillExecutionVariables([
                        {
                            variableId: 'variable',
                            value: 'xyz',
                        }
                    ]);

                    expect(variables).toStrictEqual([
                        new WorkflowExecutionVariable({
                            variableId: 'variable',
                            value: 'xyz',
                        }),
                    ]);
                });
            });

            describe('And input is a number', () => {
                it('Should throw an error', () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        variables: [
                            new WorkflowVariable({
                                id: 'variable',
                                name: 'Variable',
                                type: 'string',
                                defaultValue: null,
                                markedAsInput: true,
                                markedAsOutput: false,
                            }),
                        ],
                    });

                    expect(() => {
                        workflowVersion.fillExecutionVariables([
                            {
                                variableId: 'variable',
                                value: 123,
                            }
                        ]);
                    }).toThrow('Input value for variable \'Variable\' must be a string, got number.');
                });
            });

            describe('And input is a boolean', () => {
                it('Should throw an error', () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        variables: [
                            new WorkflowVariable({
                                id: 'variable',
                                name: 'Variable',
                                type: 'string',
                                defaultValue: null,
                                markedAsInput: true,
                                markedAsOutput: false,
                            }),
                        ],
                    });

                    expect(() => {
                        workflowVersion.fillExecutionVariables([
                            {
                                variableId: 'variable',
                                value: true,
                            }
                        ]);
                    }).toThrow('Input value for variable \'Variable\' must be a string, got boolean.');
                });
            });
        });

        describe.each([null, undefined])
        ('When input is provided with %s value', inputValue => {
            it('Should throw an error', () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'active',
                    variables: [
                        new WorkflowVariable({
                            id: 'variable-1',
                            name: 'Variable 1',
                            type: 'string',
                            defaultValue: null,
                            markedAsInput: true,
                            markedAsOutput: false,
                        }),
                    ],
                });

                expect(() => {
                    workflowVersion.fillExecutionVariables([
                        {
                            variableId: 'variable-1',
                            value: inputValue,
                        }
                    ]);
                }).toThrow('Input value cannot be null');
            });
        });
    });

    describe('Execute Workflow Version', () => {
        describe('When workflow version is draft', () => {
            it('Should throw an error', async () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'draft',
                });

                await expect(() => {
                    return workflowVersion.execute({
                        inputs: [],
                    });
                }).rejects.toThrow('Cannot execute a workflow version that is not active');
            });
        });

        describe('When workflow version is inactive', () => {
            it('Should throw an error', async () => {
                const workflowVersion = createWorkflowVersion({
                    status: 'inactive',
                });

                await expect(() => {
                    return workflowVersion.execute({
                        inputs: [],
                    });
                }).rejects.toThrow('Cannot execute a workflow version that is not active');
            });
        });

        describe('When workflow version is active', () => {
            describe('And there is only a start element', () => {
                it('Should visit the start element', async () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                    });

                    const { history } = await workflowVersion.execute({
                        inputs: [],
                    });

                    expect(history).toStrictEqual([
                        'start',
                    ]);
                });
            });

            describe('And there is a assign element', () => {
                it('Should visit all elements', async () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        elements: [
                            new WorkflowStartElement({
                                id: 'start',
                                positionX: 0,
                                positionY: 0,
                                nextElementId: 'assign-1',
                            }),

                            new WorkflowAssignElement({
                                id: 'assign-1',
                                name: 'Assign 1',
                                description: '',
                                positionX: 100,
                                positionY: 0,
                                assignments: [],
                                nextElementId: null,
                            }),
                        ],
                    });

                    const { history } = await workflowVersion.execute({
                        inputs: [],
                    });

                    expect(history).toStrictEqual([
                        'start',
                        'assign-1',
                    ]);
                });
            });

            describe('And there are no variables', () => {
                it('Should return no outputs', async () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                    });

                    const { outputs } = await workflowVersion.execute({
                        inputs: [],
                    });

                    expect(outputs).toStrictEqual([]);
                });
            });

            describe('And there are variables marked as outputs', () => {
                describe('And there are assignments', () => {
                    it('Should return outputs with the assigned values', async () => {
                        const workflowVersion = createWorkflowVersion({
                            status: 'active',
                            variables: [
                                new WorkflowVariable({
                                    id: 'variable',
                                    name: 'Variable',
                                    type: 'number',
                                    defaultValue: {
                                        type: 'number',
                                        number: 1,
                                    },
                                    markedAsInput: false,
                                    markedAsOutput: true,
                                }),
                            ],

                            elements: [
                                new WorkflowStartElement({
                                    id: 'start',
                                    positionX: 0,
                                    positionY: 0,
                                    nextElementId: 'assign-1'
                                }),
                                
                                new WorkflowAssignElement({
                                    id: 'assign-1',
                                    name: 'Assign 1',
                                    description: 'This is first assign element.',
                                    positionX: 100,
                                    positionY: 0,
                                    assignments: [
                                        {
                                            id: 'assign-1-1',
                                            operator: 'set',
                                            variableId: 'variable',
                                            operand: {
                                                type: 'value',
                                                value: {
                                                    type: 'number',
                                                    number: 2,
                                                }
                                            },
                                        }
                                    ],
                                    nextElementId: null,
                                })
                            ]
                        });

                        const { outputs } = await workflowVersion.execute({
                            inputs: [],
                        });

                        expect(outputs).toStrictEqual([
                            new WorkflowExecutionOutput({
                                variableId: 'variable',
                                value: new WorkflowNumberValue(2),
                            }),
                        ]);
                    });
                });

                describe('And there is no assignments', () => {
                    it('Should return outputs with default values', async () => {
                        const workflowVersion = createWorkflowVersion({
                            status: 'active',
                            variables: [
                                new WorkflowVariable({
                                    id: 'variable',
                                    name: 'Variable',
                                    type: 'string',
                                    defaultValue: {
                                        type: 'string',
                                        string: 'abc',
                                    },
                                    markedAsInput: false,
                                    markedAsOutput: true,
                                }),
                            ],
                        });
    
                        const { outputs } = await workflowVersion.execute({
                            inputs: [],
                        });
    
                        expect(outputs).toStrictEqual([
                            new WorkflowExecutionOutput({
                                variableId: 'variable',
                                value: new WorkflowStringValue('abc'),
                            }),
                        ]);
                    });
                });
            });

            describe('And there are no variables marked as outputs', () => {
                it('Should return no outputs', async () => {
                    const workflowVersion = createWorkflowVersion({
                        status: 'active',
                        variables: [
                            new WorkflowVariable({
                                id: 'variable',
                                name: 'Variable',
                                type: 'string',
                                defaultValue: {
                                    type: 'string',
                                    string: 'abc',
                                },
                                markedAsInput: false,
                                markedAsOutput: false,
                            }),
                        ],
                    });

                    const { outputs } = await workflowVersion.execute({
                        inputs: [],
                    });

                    expect(outputs).toStrictEqual([]);
                });
            });
        });
    });

    it('Should create a workflow version', async () => {
        const workflowVersion = WorkflowVersion.create({
            number: 1,
            workflowId: 'workflow-1',
            createdById: 'user-1',
        });

        const expectedWorkflowVersion = new WorkflowVersion({
            id: expect.any(String),
            status: 'draft',
            number: 1,
            workflowId: 'workflow-1',
            elements: [
                new WorkflowStartElement({
                    id: expect.any(String),
                    positionX: 0,
                    positionY: 0,
                }),
            ],
            variables: [],
            createdAt: expect.any(Date),
            createdById: 'user-1',
        });

        expect(workflowVersion).toStrictEqual(expectedWorkflowVersion);
    });
});