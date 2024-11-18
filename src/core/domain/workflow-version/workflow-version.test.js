import {
    WorkflowVersion,
    WorkflowVariable,
    WorkflowStartElement,
    WorkflowIfElement,
    WorkflowAssignElement,
    WorkflowExecution,
    WorkflowExecutionOutput,

    WorkflowExecutionContext,
} from './workflow-version';

describe('Workflow Version', () => {
    // describe('Fill Execution Variables', () => {
    //     describe('When variable has default value', () => {
    //         describe('And variable is marked as input', () => {
    //             describe('And input is provided', () => {
    //                it('Should fill the variable with the input value', () => {
    //                     const workflowVersion = createWorkflowVersion({
    //                         status: 'active',
    //                         variables: [
    //                             new WorkflowVariable({
    //                                 id: 'variable',
    //                                 name: 'Variable',
    //                                 type: 'string',
    //                                 defaultValue: {
    //                                     type: 'string',
    //                                     string: 'abc',
    //                                 },
    //                                 markedAsInput: true,
    //                                 markedAsOutput: false,
    //                             }),
    //                         ],
    //                     });

    //                     const variables = workflowVersion.fillExecutionVariables([
    //                         {
    //                             variableId: 'variable',
    //                             value: 'xyz',
    //                         }
    //                     ]);

    //                     expect(variables).toStrictEqual([
    //                         new WorkflowExecutionVariable({
    //                             variableId: 'variable',
    //                             value: 'xyz',
    //                         }),
    //                     ]);
    //                });
    //             });

    //             describe('And input is missing', () => {
    //                 it('Should fill the variable with the default value', () => {
    //                     const workflowVersion = createWorkflowVersion({
    //                         status: 'active',
    //                         variables: [
    //                             new WorkflowVariable({
    //                                 id: 'variable',
    //                                 name: 'Variable',
    //                                 type: 'string',
    //                                 defaultValue: {
    //                                     type: 'string',
    //                                     string: 'abc',
    //                                 },
    //                                 markedAsInput: true,
    //                                 markedAsOutput: false,
    //                             }),
    //                         ],
    //                     });

    //                     const variables = workflowVersion.fillExecutionVariables([]);

    //                     expect(variables).toStrictEqual([
    //                         new WorkflowExecutionVariable({
    //                             variableId: 'variable',
    //                             value: new WorkflowStringValue('abc'),
    //                         }),
    //                     ]);
    //                 });
    //             });
    //         });

    //         describe('And variable is not marked as input', () => {
    //             describe('And input is provided', () => {
    //                 it('Should throw an error', () => {
    //                     const workflowVersion = createWorkflowVersion({
    //                         status: 'active',
    //                         variables: [
    //                             new WorkflowVariable({
    //                                 id: 'variable-1',
    //                                 name: 'Variable 1',
    //                                 type: 'string',
    //                                 defaultValue: {
    //                                     type: 'string',
    //                                     string: 'abc',
    //                                 },
    //                                 markedAsInput: false,
    //                                 markedAsOutput: false,
    //                             }),
    //                         ],
    //                     });

    //                     expect(() => {
    //                         workflowVersion.fillExecutionVariables([
    //                             {
    //                                 variableId: 'variable-1',
    //                                 value: 'xyz',
    //                             }
    //                         ]);
    //                     }).toThrow('Variable \'Variable 1\' is not marked as input');
    //                 });
    //             });

    //             describe('And input is missing', () => {
    //                 it('Should fill the variable with the default value', () => {
    //                     const workflowVersion = createWorkflowVersion({
    //                         status: 'active',
    //                         variables: [
    //                             new WorkflowVariable({
    //                                 id: 'variable',
    //                                 name: 'Variable',
    //                                 type: 'string',
    //                                 defaultValue: {
    //                                     type: 'string',
    //                                     string: 'abc',
    //                                 },
    //                                 markedAsInput: false,
    //                                 markedAsOutput: false,
    //                             }),
    //                         ],
    //                     });

    //                     const variables = workflowVersion.fillExecutionVariables([]);

    //                     expect(variables).toStrictEqual([
    //                         new WorkflowExecutionVariable({
    //                             variableId: 'variable',
    //                             value: new WorkflowStringValue('abc'),
    //                         }),
    //                     ]);
    //                 });
    //             });
    //         });
    //     });
        
    //     describe('When variable does not have default value and variable is marked as input', () => {
    //         describe('And input is provided', () => {
    //             it('Should fill the variable with the input value', () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     variables: [
    //                         new WorkflowVariable({
    //                             id: 'variable',
    //                             name: 'Variable',
    //                             type: 'string',
    //                             defaultValue: null,
    //                             markedAsInput: true,
    //                             markedAsOutput: false,
    //                         }),
    //                     ],
    //                 });

    //                 const variables = workflowVersion.fillExecutionVariables([
    //                     {
    //                         variableId: 'variable',
    //                         value: 'xyz',
    //                     }
    //                 ]);

    //                 expect(variables).toStrictEqual([
    //                     new WorkflowExecutionVariable({
    //                         variableId: 'variable',
    //                         value: 'xyz',
    //                     }),
    //                 ]);
    //             });
    //         });

    //         describe('And input is missing', () => {
    //             it('Should throw an error', () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     variables: [
    //                         new WorkflowVariable({
    //                             id: 'variable-1',
    //                             name: 'Variable 1',
    //                             type: 'string',
    //                             defaultValue: null,
    //                             markedAsInput: true,
    //                             markedAsOutput: false,
    //                         }),
    //                     ],
    //                 });

    //                 expect(() => {
    //                     workflowVersion.fillExecutionVariables([]);
    //                 }).toThrow('Input value for variable \'Variable 1\' is required.');
    //             });
    //         });
    //     });

    //     describe('When input is provided for a variable that does not exist', () => {
    //         it('Should throw an error', () => {
    //             const workflowVersion = createWorkflowVersion({
    //                 status: 'active',
    //                 variables: [],
    //             });

    //             expect(() => {
    //                 workflowVersion.fillExecutionVariables([
    //                     {
    //                         variableId: 'variable-1',
    //                         value: 'xyz',
    //                     }
    //                 ]);
    //             }).toThrow('Variable \'variable-1\' does not exist');
    //         });
    //     });

    //     describe('When input is provided for a variable that is not marked as input', () => {
    //         it('Should throw an error', () => {
    //             const workflowVersion = createWorkflowVersion({
    //                 status: 'active',
    //                 variables: [
    //                     new WorkflowVariable({
    //                         id: 'variable-1',
    //                         name: 'Variable 1',
    //                         type: 'string',
    //                         defaultValue: {
    //                             type: 'string',
    //                             string: 'abc',
    //                         },
    //                         markedAsInput: false,
    //                         markedAsOutput: false,
    //                     }),
    //                 ],
    //             });

    //             expect(() => {
    //                 workflowVersion.fillExecutionVariables([
    //                     {
    //                         variableId: 'variable-1',
    //                         value: 'xyz',
    //                     }
    //                 ]);
    //             }).toThrow('Variable \'Variable 1\' is not marked as input');
    //         });
    //     });

    //     describe('When variable is a string', () => {
    //         describe('And input is a string', () => {
    //             it('Should fill the variable with the input value', () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     variables: [
    //                         new WorkflowVariable({
    //                             id: 'variable',
    //                             name: 'Variable',
    //                             type: 'string',
    //                             defaultValue: null,
    //                             markedAsInput: true,
    //                             markedAsOutput: false,
    //                         }),
    //                     ],
    //                 });

    //                 const variables = workflowVersion.fillExecutionVariables([
    //                     {
    //                         variableId: 'variable',
    //                         value: 'xyz',
    //                     }
    //                 ]);

    //                 expect(variables).toStrictEqual([
    //                     new WorkflowExecutionVariable({
    //                         variableId: 'variable',
    //                         value: 'xyz',
    //                     }),
    //                 ]);
    //             });
    //         });

    //         describe('And input is a number', () => {
    //             it('Should throw an error', () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     variables: [
    //                         new WorkflowVariable({
    //                             id: 'variable',
    //                             name: 'Variable',
    //                             type: 'string',
    //                             defaultValue: null,
    //                             markedAsInput: true,
    //                             markedAsOutput: false,
    //                         }),
    //                     ],
    //                 });

    //                 expect(() => {
    //                     workflowVersion.fillExecutionVariables([
    //                         {
    //                             variableId: 'variable',
    //                             value: 123,
    //                         }
    //                     ]);
    //                 }).toThrow('Input value for variable \'Variable\' must be a string, got number.');
    //             });
    //         });

    //         describe('And input is a boolean', () => {
    //             it('Should throw an error', () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     variables: [
    //                         new WorkflowVariable({
    //                             id: 'variable',
    //                             name: 'Variable',
    //                             type: 'string',
    //                             defaultValue: null,
    //                             markedAsInput: true,
    //                             markedAsOutput: false,
    //                         }),
    //                     ],
    //                 });

    //                 expect(() => {
    //                     workflowVersion.fillExecutionVariables([
    //                         {
    //                             variableId: 'variable',
    //                             value: true,
    //                         }
    //                     ]);
    //                 }).toThrow('Input value for variable \'Variable\' must be a string, got boolean.');
    //             });
    //         });
    //     });

    //     describe.each([null, undefined])
    //     ('When input is provided with %s value', inputValue => {
    //         it('Should throw an error', () => {
    //             const workflowVersion = createWorkflowVersion({
    //                 status: 'active',
    //                 variables: [
    //                     new WorkflowVariable({
    //                         id: 'variable-1',
    //                         name: 'Variable 1',
    //                         type: 'string',
    //                         defaultValue: null,
    //                         markedAsInput: true,
    //                         markedAsOutput: false,
    //                     }),
    //                 ],
    //             });

    //             expect(() => {
    //                 workflowVersion.fillExecutionVariables([
    //                     {
    //                         variableId: 'variable-1',
    //                         value: inputValue,
    //                     }
    //                 ]);
    //             }).toThrow('Input value cannot be null');
    //         });
    //     });
    // });

    // describe('Execute Workflow Version', () => {
    //     describe('When workflow version is draft', () => {
    //         it('Should throw an error', async () => {
    //             const workflowVersion = createWorkflowVersion({
    //                 status: 'draft',
    //             });

    //             await expect(() => {
    //                 return workflowVersion.execute({
    //                     inputs: [],
    //                 });
    //             }).rejects.toThrow('Cannot execute a workflow version that is not active');
    //         });
    //     });

    //     describe('When workflow version is inactive', () => {
    //         it('Should throw an error', async () => {
    //             const workflowVersion = createWorkflowVersion({
    //                 status: 'inactive',
    //             });

    //             await expect(() => {
    //                 return workflowVersion.execute({
    //                     inputs: [],
    //                 });
    //             }).rejects.toThrow('Cannot execute a workflow version that is not active');
    //         });
    //     });

    //     describe('When workflow version is active', () => {
    //         describe('And there is only a start element', () => {
    //             it('Should visit the start element', async () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                 });

    //                 const { history } = await workflowVersion.execute({
    //                     inputs: [],
    //                 });

    //                 expect(history).toStrictEqual([
    //                     'start',
    //                 ]);
    //             });
    //         });

    //         describe('And there is a assign element', () => {
    //             it('Should visit all elements', async () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     elements: [
    //                         new WorkflowStartElement({
    //                             id: 'start',
    //                             positionX: 0,
    //                             positionY: 0,
    //                             nextElementId: 'assign-1',
    //                         }),

    //                         new WorkflowAssignElement({
    //                             id: 'assign-1',
    //                             name: 'Assign 1',
    //                             description: '',
    //                             positionX: 100,
    //                             positionY: 0,
    //                             assignments: [],
    //                             nextElementId: null,
    //                         }),
    //                     ],
    //                 });

    //                 const { history } = await workflowVersion.execute({
    //                     inputs: [],
    //                 });

    //                 expect(history).toStrictEqual([
    //                     'start',
    //                     'assign-1',
    //                 ]);
    //             });
    //         });

    //         describe('And there are no variables', () => {
    //             it('Should return no outputs', async () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                 });

    //                 const { outputs } = await workflowVersion.execute({
    //                     inputs: [],
    //                 });

    //                 expect(outputs).toStrictEqual([]);
    //             });
    //         });

    //         describe('And there are variables marked as outputs', () => {
    //             describe('And there are assignments', () => {
    //                 it('Should return outputs with the assigned values', async () => {
    //                     const workflowVersion = createWorkflowVersion({
    //                         status: 'active',
    //                         variables: [
    //                             new WorkflowVariable({
    //                                 id: 'variable',
    //                                 name: 'Variable',
    //                                 type: 'number',
    //                                 defaultValue: {
    //                                     type: 'number',
    //                                     number: 1,
    //                                 },
    //                                 markedAsInput: false,
    //                                 markedAsOutput: true,
    //                             }),
    //                         ],

    //                         elements: [
    //                             new WorkflowStartElement({
    //                                 id: 'start',
    //                                 positionX: 0,
    //                                 positionY: 0,
    //                                 nextElementId: 'assign-1'
    //                             }),
                                
    //                             new WorkflowAssignElement({
    //                                 id: 'assign-1',
    //                                 name: 'Assign 1',
    //                                 description: 'This is first assign element.',
    //                                 positionX: 100,
    //                                 positionY: 0,
    //                                 assignments: [
    //                                     {
    //                                         id: 'assign-1-1',
    //                                         operator: 'set',
    //                                         variableId: 'variable',
    //                                         operand: {
    //                                             type: 'value',
    //                                             value: {
    //                                                 type: 'number',
    //                                                 number: 2,
    //                                             }
    //                                         },
    //                                     }
    //                                 ],
    //                                 nextElementId: null,
    //                             })
    //                         ]
    //                     });

    //                     const { outputs } = await workflowVersion.execute({
    //                         inputs: [],
    //                     });

    //                     expect(outputs).toStrictEqual([
    //                         new WorkflowExecutionOutput({
    //                             variableId: 'variable',
    //                             value: new WorkflowNumberValue(2),
    //                         }),
    //                     ]);
    //                 });
    //             });

    //             describe('And there is no assignments', () => {
    //                 it('Should return outputs with default values', async () => {
    //                     const workflowVersion = createWorkflowVersion({
    //                         status: 'active',
    //                         variables: [
    //                             new WorkflowVariable({
    //                                 id: 'variable',
    //                                 name: 'Variable',
    //                                 type: 'string',
    //                                 defaultValue: {
    //                                     type: 'string',
    //                                     string: 'abc',
    //                                 },
    //                                 markedAsInput: false,
    //                                 markedAsOutput: true,
    //                             }),
    //                         ],
    //                     });
    
    //                     const { outputs } = await workflowVersion.execute({
    //                         inputs: [],
    //                     });
    
    //                     expect(outputs).toStrictEqual([
    //                         new WorkflowExecutionOutput({
    //                             variableId: 'variable',
    //                             value: new WorkflowStringValue('abc'),
    //                         }),
    //                     ]);
    //                 });
    //             });
    //         });

    //         describe('And there are no variables marked as outputs', () => {
    //             it('Should return no outputs', async () => {
    //                 const workflowVersion = createWorkflowVersion({
    //                     status: 'active',
    //                     variables: [
    //                         new WorkflowVariable({
    //                             id: 'variable',
    //                             name: 'Variable',
    //                             type: 'string',
    //                             defaultValue: {
    //                                 type: 'string',
    //                                 string: 'abc',
    //                             },
    //                             markedAsInput: false,
    //                             markedAsOutput: false,
    //                         }),
    //                     ],
    //                 });

    //                 const { outputs } = await workflowVersion.execute({
    //                     inputs: [],
    //                 });

    //                 expect(outputs).toStrictEqual([]);
    //             });
    //         });
    //     });
    // });

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
                    defaultValue: {
                        type: 'string',
                        string: 'abc',
                    },
                    markedAsInput: true,
                    markedAsOutput: false,
                },

                {
                    id: 'variable-number',
                    name: 'Variable Number',
                    type: 'number',
                    defaultValue: {
                        type: 'number',
                        number: 123,
                    },
                    markedAsInput: false,
                    markedAsOutput: true,
                },

                {
                    id: 'variable-boolean',
                    name: 'Variable Boolean',
                    type: 'boolean',
                    defaultValue: {
                        type: 'boolean',
                        boolean: true,
                    },
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
                defaultValue: {
                    type: 'string',
                    string: 'abc',
                },
                markedAsInput: true,
                markedAsOutput: false,
            }),

            new WorkflowVariable({
                id: 'variable-number',
                name: 'Variable Number',
                type: 'number',
                defaultValue: {
                    type: 'number',
                    number: 123,
                },
                markedAsInput: false,
                markedAsOutput: true,
            }),

            new WorkflowVariable({
                id: 'variable-boolean',
                name: 'Variable Boolean',
                type: 'boolean',
                defaultValue: {
                    type: 'boolean',
                    boolean: true,
                },
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
        describe('Context', () => {
            it('Should find a variable by id when it exists', () => {
                const workflowExecutionContext = new WorkflowExecutionContext({
                    variables: [
                        {
                            id: 'variable-1',
                            type: 'string',
                            value: 'abc',
                            markedAsOutput: false,
                        },
                    ],
                });

                const variable = workflowExecutionContext.findVariableById('variable-1');

                expect(variable).toStrictEqual(
                    expect.objectContaining({
                        id: 'variable-1'
                    }),
                );
            });

            it.fails('Should throw an error when trying to find a variable by id and it does not exist', () => {
                const workflowExecutionContext = new WorkflowExecutionContext({
                    variables: [],
                });

                workflowExecutionContext.findVariableById('variable-does-not-exist');
            });

            it('Should get all variables marked as output', () => {
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
                        defaultValue: {
                            type: 'string',
                            string: 'abc',
                        },
                        markedAsInput: false,
                        markedAsOutput: true,
                    },

                    {
                        id: 'variable-number',
                        name: 'Variable Number',
                        type: 'number',
                        defaultValue: {
                            type: 'number',
                            number: 123,
                        },
                        markedAsInput: false,
                        markedAsOutput: true,
                    },

                    {
                        id: 'variable-boolean',
                        name: 'Variable Boolean',
                        type: 'boolean',
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
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
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
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
                                    value: {
                                        type: 'boolean',
                                        boolean: true,
                                    }
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
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
                        markedAsInput: false,
                        markedAsOutput: false,
                    },

                    {
                        id: 'variable-string',
                        name: 'Variable String',
                        type: 'string',
                        defaultValue: {
                            type: 'string',
                            string: 'not assigned',
                        },
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
                                    value: {
                                        type: 'boolean',
                                        boolean: true,
                                    }
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
                                    value: {
                                        type: 'string',
                                        string: 'satisfied',
                                    }
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
                                    value: {
                                        type: 'string',
                                        string: 'not-satisfied',
                                    }
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
                        value: {
                            type: 'string',
                            string: 'satisfied',
                        },
                    }
                ],
                workflowVersionId: workflowVersion.id,
                executedById: 'user-1',
            }));
        });
    });
});