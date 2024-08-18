import { expect } from 'chai';
import { describe } from 'vitest';
import {
    WorkflowVersion,
    WorkflowStartElement,
    WorkflowIfElement,
    WorkflowCondition,
    WorkflowAssignElement,
    WorkflowAssignment,
} from '~/core/domain/workflow-version';


describe('Workflow Version', async () => {
    it('Execute Workflow Version', async () => {
        const workflowVersion = WorkflowVersion.create({
            number: 1,
            workflowId: 'workflow-1',
            createdById: 'user-1',
        });

        const outputValues = workflowVersion.execute();

        expect(outputValues).toStrictEqual([]);
    });

    it('Create a workflow version correctly', async () => {
        const workflowVersion = WorkflowVersion.create({
            number: 1,
            workflowId: 'workflow-1',
            createdById: 'user-1',
        });

        expect(workflowVersion).toStrictEqual(new WorkflowVersion({
            id: expect.any(String),
            status: 'draft',
            number: 1,
            workflowId: 'workflow-1',
            elements: [
                new WorkflowStartElement({
                    id: expect.any(String)
                }),
            ],
            variables: [],
            createdAt: expect.any(Date),
            createdById: 'user-1',
        }));
    });

    const createWorkflowVersion = (elements) => {
        return new WorkflowVersion({
            id: 'workflow-version-1',
            number: 1,
            workflowId: 'workflow-1',
            createdById: 'user-1',
            status: 'draft',
            variables: [],
            createdAt: new Date(),
            createdById: 'user-1',
            elements,
        });
    };

    describe('Add element', () => {
        describe('Assign element', () => {
            it('Add after a start element', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign 1',
                    description: 'This is an assign element.',
                });

                const startElement = workflowVersion.getStartElement();

                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: startElement.getId(),
                });

                expect(workflowVersion.getElements()).toEqual(
                    expect.arrayContaining([
                        startElement,
                        assignElement,
                    ])
                );

                expect(startElement.getNextElementId()).toBe(assignElement.getId());
                expect(assignElement.getNextElementId()).toBeUndefined();
            });

            it('Add after an assign element', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const firstAssignElement = WorkflowAssignElement.create({
                    name: 'Assign 1',
                    description: 'This is a assign element.',
                });

                const secondAssignElement = WorkflowAssignElement.create({
                    name: 'Assign 2',
                    description: 'This is another assign element.',
                });

                workflowVersion.addElement({
                    element: firstAssignElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: secondAssignElement,
                    previousElementId: firstAssignElement.getId(),
                });

                expect(startElement.getNextElementId()).toBe(firstAssignElement.getId());
                expect(firstAssignElement.getNextElementId()).toBe(secondAssignElement.getId());
                expect(secondAssignElement.getNextElementId()).toBeUndefined();
            });

            it('Add after an if element in true branch', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign',
                    description: 'This is an assign element.',
                });

                const ifElement = WorkflowIfElement.create({
                    name: 'If',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: ifElement.getId(),
                    previousElementBranch: 'true',
                });

                expect(startElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBe(assignElement.getId());
                expect(ifElement.getNextElementIdIfFalse()).toBeUndefined();
                expect(assignElement.getNextElementId()).toBeUndefined();
            });

            it('Add after an if element in false branch', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign',
                    description: 'This is an assign element.',
                });

                const ifElement = WorkflowIfElement.create({
                    name: 'If',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: ifElement.getId(),
                    previousElementBranch: 'false',
                });

                expect(startElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(ifElement.getNextElementIdIfFalse()).toBe(assignElement.getId());
                expect(assignElement.getNextElementId()).toBeUndefined();
            });
        });

        describe('If element', () => {
            it('Add after a start element', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const ifElement = WorkflowIfElement.create({
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: startElement.getId(),
                });

                expect(workflowVersion.getElements()).toEqual(
                    expect.arrayContaining([
                        startElement,
                        ifElement,
                    ])
                );

                expect(startElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(ifElement.getNextElementIdIfFalse()).toBeUndefined();
            });

            it('Add after an assign element', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign',
                    description: 'This is an assign element.',
                });

                const ifElement = WorkflowIfElement.create({
                    name: 'If',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: assignElement.getId(),
                });

                expect(startElement.getNextElementId()).toBe(assignElement.getId());
                expect(assignElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(ifElement.getNextElementIdIfFalse()).toBeUndefined();
            });

            it('Add after an if element in true branch', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const firstIfElement = WorkflowIfElement.create({
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                const secondIfElement = WorkflowIfElement.create({
                    name: 'If 2',
                    description: 'This is another if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: firstIfElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: secondIfElement,
                    previousElementId: firstIfElement.getId(),
                    previousElementBranch: 'true',
                });

                expect(startElement.getNextElementId()).toBe(firstIfElement.getId());

                expect(firstIfElement.getNextElementIdIfTrue()).toBe(secondIfElement.getId());
                expect(firstIfElement.getNextElementIdIfFalse()).toBeUndefined();

                expect(secondIfElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(secondIfElement.getNextElementIdIfFalse()).toBeUndefined();
            });

            it('Add after an if element in false branch', async () => {
                const workflowVersion = WorkflowVersion.create({
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                });

                const startElement = workflowVersion.getStartElement();

                const firstIfElement = WorkflowIfElement.create({
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                const secondIfElement = WorkflowIfElement.create({
                    name: 'If 2',
                    description: 'This is another if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: firstIfElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: secondIfElement,
                    previousElementId: firstIfElement.getId(),
                    previousElementBranch: 'false',
                });

                expect(startElement.getNextElementId()).toBe(firstIfElement.getId());

                expect(firstIfElement.getNextElementIdIfTrue()).toBeUndefined()
                expect(firstIfElement.getNextElementIdIfFalse()).toBe(secondIfElement.getId());

                expect(secondIfElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(secondIfElement.getNextElementIdIfFalse()).toBeUndefined();
            });
        });

        it.fails('Cannot add start element', async () => {
            const workflowVersion = WorkflowVersion.create({
                number: 1,
                workflowId: 'workflow-1',
                createdById: 'user-1',
            });

            const startElement = workflowVersion.getStartElement();

            workflowVersion.addElement({
                previousElementId: startElement.getId(),
                element: WorkflowStartElement.create(),
            });
        });
    });

    describe('Remove element', () => {
        describe('Remove assign element', async () => {
            it('Without next element', async () => {
                const startElement = new WorkflowStartElement({
                    id: 'workflow-start-element-1',
                    nextElementId: 'workflow-assign-element-1',
                });
    
                const assignElement = new WorkflowAssignElement({
                    id: 'workflow-assign-element-1',
                    name: 'Assign 1',
                    assignments: [],
                });
    
                const workflowVersion = createWorkflowVersion([
                    startElement,
                    assignElement,
                ]);
    
                workflowVersion.removeElement({
                    elementId: assignElement.getId(),
                });
    
                expect(workflowVersion.getElements()).toStrictEqual([
                    startElement,
                ]);
    
                expect(startElement.getNextElementId()).toBeUndefined();
            });

            it('With next element', async () => {
                const startElement = new WorkflowStartElement({
                    id: 'start',
                    nextElementId: 'workflow-assign-element-1',
                });
    
                const assignElement1 = new WorkflowAssignElement({
                    id: 'workflow-assign-element-1',
                    name: 'Assign 1',
                    nextElementId: 'workflow-assign-element-2',
                    assignments: [],
                });
    
                const assignElement2 = new WorkflowAssignElement({
                    id: 'workflow-assign-element-2',
                    name: 'Assign 2',
                    assignments: [],
                });
    
                const workflowVersion = new WorkflowVersion({
                    id: 'workflow-version-1',
                    number: 1,
                    workflowId: 'workflow-1',
                    createdById: 'user-1',
                    status: 'draft',
                    variables: [],
                    createdAt: new Date(),
                    createdById: 'user-1',
                    elements: [
                        startElement,
                        assignElement1,
                        assignElement2
                    ],
                });
    
                workflowVersion.removeElement({
                    elementId: assignElement1.getId(),
                });
    
                expect(workflowVersion.getElements()).toStrictEqual([
                    startElement,
                    assignElement2,
                ]);
    
                expect(startElement.getNextElementId()).toBe('workflow-assign-element-2');
                expect(assignElement2.getNextElementId()).toBeUndefined();
            });
        });

        describe('Remove if element', async () => {
            describe('Keeping neither branch', () => {
                it('Without next element', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                    });
        
                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                    ])
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId()
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBeUndefined();
                });

                it('With assign element in true branch', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                        nextElementIdIfTrue: 'workflow-assign-element-1',
                    });        
                    
                    const assignElement = new WorkflowAssignElement({
                        id: 'workflow-assign-element-1',
                        name: 'Assign 1',
                        assignments: [],
                    })

                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                        assignElement,
                    ]);
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId()
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBeUndefined();
                });

                it('With assign element in false branch', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                        nextElementIdIfFalse: 'workflow-assign-element-1',
                    });        
                    
                    const assignElement = new WorkflowAssignElement({
                        id: 'workflow-assign-element-1',
                        name: 'Assign 1',
                        assignments: [],
                    })

                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                        assignElement,
                    ])
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId()
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBeUndefined();
                });
            })

            describe('Keeping true branch', () => {
                it('With assign element in true branch', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                        nextElementIdIfTrue: 'workflow-assign-element-1'
                    });
    
                    const assignElement = new WorkflowAssignElement({
                        id: 'workflow-assign-element-1',
                        name: 'Assign 1',
                        assignments: [],
                    });
        
                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                        assignElement,
                    ])
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId(),
                        elementBranchToKeep: 'true',
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                        assignElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBe(assignElement.getId());
                    expect(assignElement.getNextElementId()).toBeUndefined();
                });
    
                it('With assign element in false branch', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                        nextElementIdIfFalse: 'workflow-assign-element-1'
                    });
    
                    const assignElement = new WorkflowAssignElement({
                        id: 'workflow-assign-element-1',
                        name: 'Assign 1',
                        assignments: [],
                    });
        
                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                        assignElement,
                    ]);
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId(),
                        elementBranchToKeep: 'true',
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBeUndefined();
                });
            });

            describe('Keeping false branch', () => {
                it('With assign element in true branch', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                        nextElementIdIfTrue: 'workflow-assign-element-1'
                    });
    
                    const assignElement = new WorkflowAssignElement({
                        id: 'workflow-assign-element-1',
                        name: 'Assign 1',
                        assignments: [],
                    });
        
                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                        assignElement,
                    ]);
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId(),
                        elementBranchToKeep: 'false',
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBeUndefined();
                });
    
                it('With assign element in false branch', async () => {
                    const startElement = new WorkflowStartElement({
                        id: 'workflow-start-element-1',
                        nextElementId: 'workflow-if-element-1',
                    });
        
                    const ifElement = new WorkflowIfElement({
                        id: 'workflow-if-element-1',
                        name: 'If 1',
                        strategy: 'all',
                        conditions: [],
                        nextElementIdIfFalse: 'workflow-assign-element-1'
                    });
    
                    const assignElement = new WorkflowAssignElement({
                        id: 'workflow-assign-element-1',
                        name: 'Assign 1',
                        assignments: [],
                    });
        
                    const workflowVersion = createWorkflowVersion([
                        startElement,
                        ifElement,
                        assignElement,
                    ]);
        
                    workflowVersion.removeElement({
                        elementId: ifElement.getId(),
                        elementBranchToKeep: 'false',
                    });
        
                    expect(workflowVersion.getElements()).toStrictEqual([
                        startElement,
                        assignElement,
                    ]);
        
                    expect(startElement.getNextElementId()).toBe(assignElement.getId());
                    expect(assignElement.getNextElementId()).toBeUndefined();
                });
            });
        });

        it.fails('Cannot remove start element', async () => {
            const workflowVersion = createWorkflowVersion([
                new WorkflowStartElement({
                    id: 'workflow-start-element-1',
                }),
            ]);

            workflowVersion.removeElement({
                elementId: workflowVersion
                    .getStartElement()
                    .getId(),
            });
        });

        it.fails('Cannot specify branch to keep element', () => {
            const workflowVersion = createWorkflowVersion([
                new WorkflowStartElement({
                    id: 'workflow-start-element-1',
                    nextElementId: 'workflow-assign-element-1',
                }),
                new WorkflowAssignElement({
                    id: 'workflow-assign-element-1',
                    name: 'Assign 1',
                    assignments: [],
                }),
            ]);

            workflowVersion.removeElement({
                elementId: 'workflow-assign-element-1',
                elementBranchToKeep: 'true',
            });
        })
    });

    describe('Edit element', () => {
        it.fails('Cannot edit start element', () => {
            const workflowVersion = createWorkflowVersion([
                new WorkflowStartElement({
                    id: 'workflow-start-element-1',
                }),
            ]);

            workflowVersion.editElement({
                elementId: 'workflow-start-element-1',
            });
        });
        
        describe('Edit assignment element', () => {
            it('Without assignments', () => {
                const assignElement = new WorkflowAssignElement({
                    id: 'workflow-assign-element-1',
                    name: 'Assign 1',
                    assignments: [],
                });
    
                const workflowVersion = createWorkflowVersion([
                    assignElement,
                ]);
    
                workflowVersion.editElement({
                    elementId: 'workflow-assign-element-1',
                    elementData: {
                        name: 'Updated Assign',
                        description: 'Updated assign description',
                        assignments: [],
                    },
                });
    
                expect(assignElement.getName()).toBe('Updated Assign');
                expect(assignElement.getDescription()).toBe('Updated assign description');
                expect(assignElement.getAssignments()).toEqual([]);
            });

            it('With assignments', () => {
                const assignElement = new WorkflowAssignElement({
                    id: 'workflow-assign-element-1',
                    name: 'Assign 1',
                    assignments: [
                        new WorkflowAssignment({
                            variableId: 'variable-1',
                            operator: 'equals',
                            value: 'abc',
                        }),
                    ],
                });
    
                const workflowVersion = createWorkflowVersion([
                    assignElement,
                ]);
    
                workflowVersion.editElement({
                    elementId: 'workflow-assign-element-1',
                    elementData: {
                        name: 'Updated Assign',
                        description: 'Updated assign description',
                        assignments: [
                            {
                                variableId: 'variable-1',
                                operator: 'equals',
                                value: 'def',
                            }
                        ],
                    },
                });
    
                expect(assignElement.getName()).toBe('Updated Assign');
                expect(assignElement.getDescription()).toBe('Updated assign description');
                expect(assignElement.getAssignments()).toStrictEqual([
                    new WorkflowAssignment({
                        variableId: 'variable-1',
                        operator: 'equals',
                        value: 'def',
                    }),
                ]);
            });
        })

        describe('Edit if element', () => {
            it('Without conditions', () => {
                const ifElement = new WorkflowIfElement({
                    id: 'workflow-if-element-1',
                    name: 'If',
                    strategy: 'all',
                    conditions: [],
                })
    
                const workflowVersion = createWorkflowVersion([
                    ifElement,
                ]);
    
                workflowVersion.editElement({
                    elementId: 'workflow-if-element-1',
                    elementData: {
                        name: 'Updated If',
                        description: 'Updated if description',
                        conditions: [],
                    },
                });
    
                expect(ifElement.getName()).toBe('Updated If');
                expect(ifElement.getDescription()).toBe('Updated if description');
                expect(ifElement.getConditions()).toEqual([]);
            });

            it('With conditions', () => {
                const ifElement = new WorkflowIfElement({
                    id: 'workflow-if-element-1',
                    name: 'If',
                    strategy: 'all',
                    conditions: [
                        new WorkflowCondition({
                            variableId: 'variable-1',
                            operator: 'equals',
                            value: 'abc',
                        }),
                    ],
                })
    
                const workflowVersion = createWorkflowVersion([
                    ifElement,
                ]);
    
                workflowVersion.editElement({
                    elementId: 'workflow-if-element-1',
                    elementData: {
                        name: 'Updated If',
                        description: 'Updated if description',
                        conditions: [
                            {
                                variableId: 'variable-1',
                                operator: 'equals',
                                value: 'def',
                            }
                        ],
                    },
                });
    
                expect(ifElement.getName()).toBe('Updated If');
                expect(ifElement.getDescription()).toBe('Updated if description');
                expect(ifElement.getConditions()).toStrictEqual([
                    new WorkflowCondition({
                        variableId: 'variable-1',
                        operator: 'equals',
                        value: 'def',
                    }),
                ]);
            });
        })
        
    })
});