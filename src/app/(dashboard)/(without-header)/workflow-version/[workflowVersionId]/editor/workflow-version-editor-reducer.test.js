import workflowVersionEditorReducer from './workflow-version-editor-reducer';

describe('Workflow Version Editor Reducer', () => {
    it('Should reset workflow version', () => {
        const workflowVersionEditor = {
            workflowVersion: {
                id: 'workflow-version-1',
                elements: [],
                variables: [],
            },
            workflowVersionSidebar: null,
        };

        const output = workflowVersionEditorReducer(workflowVersionEditor, {
            type: 'workflow-version-reseted',
            workflowVersion: {
                id: 'workflow-version-1',
                elements: [
                    {
                        id: 'if-1',
                    },
                ],
                variables: [
                    {
                        id: 'variable-1',
                    },
                ],
            },
        });

        expect(output).toStrictEqual(
            expect.objectContaining({
                workflowVersion: {
                    id: 'workflow-version-1',
                    elements: [
                        {
                            id: 'if-1',
                        },
                    ],
                    variables: [
                        {
                            id: 'variable-1',
                        },
                    ],
                },
            }),
        )
    });

    describe('Sidebars', () => {
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
                workflowVersion: {
                    variables: [],
                    elements: [],
                },
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
    });

    describe('Elements', () => {
        it('Should add element', () => {
            const workflowVersionEditor = {
                workflowVersionSidebar: null,
                workflowVersion: {
                    elements: [],
                    variables: [],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-added',
                element: {
                    id: 'if-1',
                    type: 'if',
                    name: 'If A',
                    positionX: 100,
                    positionY: 200,
                    strategy: 'all',
                    description: '',
                    conditions: [],
                },
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            {
                                id: 'if-1',
                                type: 'if',
                                name: 'If A',
                                positionX: 100,
                                positionY: 200,
                                strategy: 'all',
                                description: '',
                                conditions: [],
                            },
                        ],
                    }),
                }),
            )
        });

        it('Should move element', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'if-1',
                            type: 'if',
                            name: 'If A',
                            positionX: 100,
                            positionY: 200,
                            strategy: 'all',
                            description: '',
                            conditions: [],
                        },
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-moved',
                elementId: 'if-1',
                positionX: 300,
                positionY: 400,
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            expect.objectContaining({
                                id: 'if-1',
                                positionX: 300,
                                positionY: 400,
                            }),
                        ],
                    }),
                }),
            )
        });

        it('Should connect true', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'element-1',
                            type: 'if',
                        },

                        {
                            id: 'element-2',
                            type: 'assign',
                        },
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-connected',
                connectionType: 'true',
                sourceElementId: 'element-1',
                targetElementId: 'element-2',
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            {
                                id: 'element-1',
                                type: 'if',
                                nextElementIdIfTrue: 'element-2',
                            },

                            {
                                id: 'element-2',
                                type: 'assign',
                            },
                        ],
                    }),
                }),
            )
        });

        it('Should connect false', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'element-1',
                            type: 'if',
                        },

                        {
                            id: 'element-2',
                            type: 'assign',
                        },
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-connected',
                connectionType: 'false',
                sourceElementId: 'element-1',
                targetElementId: 'element-2',
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            {
                                id: 'element-1',
                                type: 'if',
                                nextElementIdIfFalse: 'element-2',
                            },

                            {
                                id: 'element-2',
                                type: 'assign',
                            },
                        ],
                    }),
                }),
            )
        });

        it('Should remove element', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'element-1',
                            type: 'if',
                        },
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-removed',
                elementId: 'element-1',
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [],
                    }),
                }),
            )
        });

        it('Should remove all references from start element when another element is removed', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'element-1',
                            type: 'start',
                            nextElementId: 'element-2',
                        },

                        {
                            id: 'element-2',
                            type: 'assign',
                        }
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-removed',
                elementId: 'element-2',
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            {
                                id: 'element-1',
                                type: 'start',
                                nextElementId: null,
                            },
                        ],
                    }),
                }),
            )
        });

        it('Should remove all references from assign element when another element is removed', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'element-1',
                            type: 'assign',
                            nextElementId: 'element-2',
                        },

                        {
                            id: 'element-2',
                            type: 'assign',
                        }
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-removed',
                elementId: 'element-2',
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            {
                                id: 'element-1',
                                type: 'assign',
                                nextElementId: null,
                            },
                        ],
                    }),
                }),
            )
        });

        it('Should remove all references from if element when another element is removed', () => {
            const workflowVersionEditor = {
                workflowVersion: {
                    elements: [
                        {
                            id: 'element-1',
                            type: 'if',
                            nextElementIdIfTrue: 'element-2',
                            nextElementIdIfFalse: 'element-2',
                        },

                        {
                            id: 'element-2',
                            type: 'assign',
                        }
                    ],
                },
            };

            const output = workflowVersionEditorReducer(workflowVersionEditor, {
                type: 'element-removed',
                elementId: 'element-2',
            });

            expect(output).toStrictEqual(
                expect.objectContaining({
                    workflowVersion: expect.objectContaining({
                        elements: [
                            {
                                id: 'element-1',
                                type: 'if',
                                nextElementIdIfTrue: null,
                                nextElementIdIfFalse: null,
                            },
                        ],
                    }),
                }),
            )
        });
    });

    describe('Variables', () => {
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
});