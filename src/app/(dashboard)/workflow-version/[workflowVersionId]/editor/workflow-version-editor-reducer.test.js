import workflowVersionEditorReducer from './workflow-version-editor-reducer';

describe('Workflow Version Editor Reducer', () => {
    it('Should open variables sidebar', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [],
            },
            workflowVersionSidebar: null,
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'show-variables-sidebar-opened',
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersionSidebar: {
                    type: 'show-variables',
                }
            }),
        )
    });

    it('Should close variables sidebar', () => {
        const workflowVersionEditor = {
            workflowVersionSidebar: {
                type: 'show-variables',
            },
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'show-variables-sidebar-closed',
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersionSidebar: null,
            }),
        )
    });

    it('Should open add variable sidebar', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [],
            },
            workflowVersionSidebar: null,
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'add-variable-sidebar-opened',
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersionSidebar: {
                    type: 'add-variable',
                }
            }),
        )
    });

    it('Should open edit variable sidebar', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [],
            },
            workflowVersionSidebar: null,
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'edit-variable-sidebar-opened',
            variable: {
                id: 'variable-1',
                name: 'Variable 1',
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersionSidebar: {
                    type: 'edit-variable',
                    variable: {
                        id: 'variable-1',
                        name: 'Variable 1',
                    },
                }
            }),
        )
    });

    it('Should open remove variable sidebar', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [],
            },
            workflowVersionSidebar: null,
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'remove-variable-sidebar-opened',
            variable: {
                id: 'variable-1',
                name: 'Variable 1',
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersionSidebar: {
                    type: 'remove-variable',
                    variable: {
                        id: 'variable-1',
                        name: 'Variable 1',
                    },
                }
            }),
        )
    });

    it('Should add variable', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [],
            },
            workflowVersionSidebar: null,
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'add-variable-confirmed',
            addedVariable: {
                id: 'variable-1',
                name: 'Variable 1',
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersion: expect.objectContaining({
                    variables: [
                        {
                            id: 'variable-1',
                            name: 'Variable 1',
                        },
                    ],
                }),

                workflowVersionSidebar: {
                    type: 'show-variables',
                }
            }),
        )
    });

    it('Should edit variable', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [
                    {
                        id: 'variable-1',
                        name: 'Variable 1',
                    },
                ],
            },
            workflowVersionSidebar: {
                type: 'edit-variable',
                variable: {
                    id: 'variable-1',
                    name: 'Variable ABC',
                },
            },
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'edit-variable-confirmed',
            editedVariable: {
                id: 'variable-1',
                name: 'Variable XYZ',
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersion: expect.objectContaining({
                    variables: [
                        {
                            id: 'variable-1',
                            name: 'Variable XYZ',
                        },
                    ],
                }),

                workflowVersionSidebar: {
                    type: 'show-variables',
                }
            }),
        )
    });

    it('Should remove variable', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                variables: [
                    {
                        id: 'variable-1',
                        name: 'Variable 1',
                    },
                ],
            },
            workflowVersionSidebar: {
                type: 'remove-variable',
                variable: {
                    id: 'variable-1',
                    name: 'Variable 1',
                },
            },
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'remove-variable-confirmed',
            removedVariable: {
                id: 'variable-1',
                name: 'Variable 1',
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersion: expect.objectContaining({
                    variables: [],
                }),

                workflowVersionSidebar: {
                    type: 'show-variables',
                },
            }),
        )
    });

    it('Should edit if element', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                elements: [
                    {
                        id: 'if-1',
                        type: 'if',
                        name: 'If A',
                    },
                ],
            },
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'edit-element-confirmed',
            editedElement: {
                id: 'if-1',
                type: 'if',
                name: 'If B',
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersion: expect.objectContaining({
                    elements: [
                        {
                            id: 'if-1',
                            type: 'if',
                            name: 'If B',
                        },
                    ],
                }),
                workflowVersionSidebar: null,
            }),
        )
    });
});