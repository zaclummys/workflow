import '@testing-library/jest-dom/vitest';

import { render, screen, act, fireEvent } from '@testing-library/react';
import AssignElementSidebar from './assign-element-sidebar';

describe('Assign Element Sidebar', () => {
    const variables = [
        { id: 'variable-string-1', name: 'Variable String 1', type: 'string' },
        { id: 'variable-string-2', name: 'Variable String 2', type: 'string' },
        { id: 'variable-number-1', name: 'Variable Number 1', type: 'number' },
        { id: 'variable-number-2', name: 'Variable Number 2', type: 'number' },
        { id: 'variable-boolean-1', name: 'Variable Boolean 1', type: 'boolean' },
        { id: 'variable-boolean-2', name: 'Variable Boolean 2', type: 'boolean' },
    ];

    it('Should render with initial values', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
            />
        );

        expect(screen.getByLabelText('Name')).toHaveValue('Assign');
        expect(screen.getByLabelText('Description')).toHaveValue('This is an assign element.');
    });

    it('Should allow user to change values', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');

        fireEvent.change(nameInput, { target: { value: 'Changed Assign' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a changed assign element.' } });

        expect(nameInput).toHaveValue('Changed Assign');
        expect(descriptionInput).toHaveValue('This is a changed assign element.');
    });

    it('Should reset values when variable is changed', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [
                {
                    id: 'assignment-1',
                    variableId: 'variable-string-1',
                    operator: 'set',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-string-1',
                    },
                },
            ],
        };

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
            />
        );

        const variableSelect = screen.getByLabelText('Variable');
        const operatorSelect = screen.getByLabelText('Operator');
        const operandTypeSelect = screen.getByLabelText('Operand Type');
        const operandVariableSelect = screen.getByLabelText('Operand Variable');

        fireEvent.change(variableSelect, { target: { value: 'variable-string-2' } });

        expect(variableSelect).toHaveValue('variable-string-2');
        expect(operatorSelect).toHaveValue('set');
        expect(operandTypeSelect).toHaveValue('variable');
        expect(operandVariableSelect).toHaveValue('variable-string-2');
    });

    describe('Assignments', () => {
        it('Should allow user to add assignments', () => {
            const assignElement = {
                id: 'assign-1',
                type: 'assign',
                name: 'Assign',
                description: 'This is an assign element.',
                assignments: [],
            };

            render(
                <AssignElementSidebar
                    assignElement={assignElement}
                    variables={variables}
                />
            );

            const addAssignmentButton = screen.getByText('Add assignment');

            fireEvent.click(addAssignmentButton);

            expect(screen.getByLabelText('Variable')).toHaveValue('variable-string-1');
            expect(screen.getByLabelText('Operator')).toHaveValue('set');
            expect(screen.getByLabelText('Operand Type')).toHaveValue('variable');
            expect(screen.getByLabelText('Operand Variable')).toHaveValue('variable-string-1');
        });

        it('Should allow user to change an added assignment', () => {
            const assignElement = {
                id: 'assign-1',
                type: 'assign',
                name: 'Assign',
                description: 'This is an assign element.',
                assignments: [],
            };

            render(
                <AssignElementSidebar
                    assignElement={assignElement}
                    variables={variables}
                />
            );

            const addAssignmentButton = screen.getByText('Add assignment');

            fireEvent.click(addAssignmentButton);

            const variableSelect = screen.getByLabelText('Variable');
            const operatorSelect = screen.getByLabelText('Operator');
            const operandTypeSelect = screen.getByLabelText('Operand Type');

            fireEvent.change(variableSelect, { target: { value: 'variable-number-2' } });
            fireEvent.change(operatorSelect, { target: { value: 'increment' } });
            fireEvent.change(operandTypeSelect, { target: { value: 'value' } });

            const operandValueInput = screen.getByLabelText('Operand Value');

            fireEvent.change(operandValueInput, { target: { value: '10' } });

            expect(variableSelect).toHaveValue('variable-number-2');
            expect(operatorSelect).toHaveValue('increment');
            expect(operandTypeSelect).toHaveValue('value');
            expect(operandValueInput).toHaveValue(10);
        });

        describe('When operand type is variable', () => {
            describe('And variable type is string', () => {
                it('Should allow user to change the operand type', () => {
                    const assignElement = {
                        id: 'assign-1',
                        type: 'assign',
                        name: 'Assign',
                        description: 'This is an assign element.',
                        assignments: [
                            {
                                id: 'assignment-1',
                                variableId: 'variable-string-1',
                                operator: 'set',
                                operand: {
                                    type: 'variable',
                                    variableId: 'variable-string-1',
                                },
                            },
                        ],
                    };
    
                    render(
                        <AssignElementSidebar
                            assignElement={assignElement}
                            variables={variables}
                        />
                    );
    
                    const operandTypeSelect = screen.getByLabelText('Operand Type');
    
                    fireEvent.change(operandTypeSelect, { target: { value: 'value' } });
    
                    expect(operandTypeSelect).toHaveValue('value');
    
                    const operandValueInput = screen.getByLabelText('Operand Value');
    
                    expect(operandValueInput).toHaveValue('');
                });
            });

            describe('And variable type is string', () => {
                it('Should allow user to change the operand type', () => {
                    const assignElement = {
                        id: 'assign-1',
                        type: 'assign',
                        name: 'Assign',
                        description: 'This is an assign element.',
                        assignments: [
                            {
                                id: 'assignment-1',
                                variableId: 'variable-number-1',
                                operator: 'set',
                                operand: {
                                    type: 'variable',
                                    variableId: 'variable-number-1',
                                },
                            },
                        ],
                    };
    
                    render(
                        <AssignElementSidebar
                            assignElement={assignElement}
                            variables={variables}
                        />
                    );
    
                    const operandTypeSelect = screen.getByLabelText('Operand Type');
    
                    fireEvent.change(operandTypeSelect, { target: { value: 'value' } });
    
                    expect(operandTypeSelect).toHaveValue('value');
    
                    const operandValueInput = screen.getByLabelText('Operand Value');
    
                    expect(operandValueInput).toHaveValue(0);
                });
            });

            describe('And variable type is number', () => {
                it('Should allow user to change the operand type', () => {
                    const assignElement = {
                        id: 'assign-1',
                        type: 'assign',
                        name: 'Assign',
                        description: 'This is an assign element.',
                        assignments: [
                            {
                                id: 'assignment-1',
                                variableId: 'variable-boolean-1',
                                operator: 'set',
                                operand: {
                                    type: 'variable',
                                    variableId: 'variable-boolean-1',
                                },
                            },
                        ],
                    };
    
                    render(
                        <AssignElementSidebar
                            assignElement={assignElement}
                            variables={variables}
                        />
                    );
    
                    const operandTypeSelect = screen.getByLabelText('Operand Type');
    
                    fireEvent.change(operandTypeSelect, { target: { value: 'value' } });
    
                    expect(operandTypeSelect).toHaveValue('value');
    
                    const operandValueInput = screen.getByLabelText('Operand Value');
    
                    expect(operandValueInput).toHaveValue('false');
                });
            });

            it('Should render with initial values', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-string-2',
                            operator: 'set',
                            operand: {
                                type: 'variable',
                                variableId: 'variable-string-2',
                            },
                        },
                    ],
                };

                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );

                expect(screen.getByLabelText('Variable')).toHaveValue('variable-string-2');
                expect(screen.getByLabelText('Operator')).toHaveValue('set');
                expect(screen.getByLabelText('Operand Type')).toHaveValue('variable');
                expect(screen.getByLabelText('Operand Variable')).toHaveValue('variable-string-2');
            });

            it('Should allow user to change the variable', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-number-1',
                            operator: 'set',
                            operand: {
                                type: 'variable',
                                variableId: 'variable-number-1',
                            },
                        },
                    ],
                };

                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );

                const operandVariableSelect = screen.getByLabelText('Operand Variable');

                fireEvent.change(operandVariableSelect, { target: { value: 'variable-number-2' } });

                expect(operandVariableSelect).toHaveValue('variable-number-2');
            });

            

            it('Should allow user to remove the assignment', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-string-1',
                            operator: 'set',
                            operand: {
                                type: 'variable',
                                variableId: 'variable-string-1',
                            },
                        },
                    ],
                };
    
                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );
    
                const variableSelect = screen.getByLabelText('Variable');
                const operatorSelect = screen.getByLabelText('Operator');
                const operandTypeSelect = screen.getByLabelText('Operand Type');
                const operandVariableSelect = screen.getByLabelText('Operand Variable');
    
                const removeAssignmentButton = screen.getByText('Remove');
    
                fireEvent.click(removeAssignmentButton);
    
                expect(variableSelect).not.toBeInTheDocument();
                expect(operatorSelect).not.toBeInTheDocument();
                expect(operandTypeSelect).not.toBeInTheDocument();
                expect(operandVariableSelect).not.toBeInTheDocument();
            });
        });

        describe('When operand type is value', () => {
            it('Should render with initial values', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-number-1',
                            operator: 'set',
                            operand: {
                                type: 'value',
                                value: {
                                    type: 'number',
                                    number: 10,
                                }
                            },
                        },
                    ],
                };

                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );

                expect(screen.getByLabelText('Variable')).toHaveValue('variable-number-1');
                expect(screen.getByLabelText('Operator')).toHaveValue('set');
                expect(screen.getByLabelText('Operand Type')).toHaveValue('value');
                expect(screen.getByLabelText('Operand Value')).toHaveValue(10);
            });

            it('Should allow user to change the value', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-number-2',
                            operator: 'set',
                            operand: {
                                type: 'value',
                                value: {
                                    type: 'number',
                                    number: 10,
                                },
                            },
                        },
                    ],
                };

                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );

                const operandValueInput = screen.getByLabelText('Operand Value');

                fireEvent.change(operandValueInput, { target: { value: '20' } });

                expect(operandValueInput).toHaveValue(20);
            });

            it('Should allow user to change the operand type', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-number-2',
                            operator: 'set',
                            operand: {
                                type: 'value',
                                value: {
                                    type: 'number',
                                    number: 10,
                                },
                            },
                        },
                    ],
                };

                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );

                const operandTypeSelect = screen.getByLabelText('Operand Type');

                fireEvent.change(operandTypeSelect, { target: { value: 'variable' } });

                expect(operandTypeSelect).toHaveValue('variable');

                const operandVariableSelect = screen.getByLabelText('Operand Variable');

                expect(operandVariableSelect).toHaveValue('variable-number-2');
            });

            it('Should allow user to remove the assignment', () => {
                const assignElement = {
                    id: 'assign-1',
                    type: 'assign',
                    name: 'Assign',
                    description: 'This is an assign element.',
                    assignments: [
                        {
                            id: 'assignment-1',
                            variableId: 'variable-string-1',
                            operator: 'set',
                            operand: {
                                type: 'value',
                                value: {
                                    type: 'string',
                                    string: 'Hello, World!',
                                },
                            },
                        },
                    ],
                };
    
                render(
                    <AssignElementSidebar
                        assignElement={assignElement}
                        variables={variables}
                    />
                );
    
                const variableSelect = screen.getByLabelText('Variable');
                const operatorSelect = screen.getByLabelText('Operator');
                const operandTypeSelect = screen.getByLabelText('Operand Type');
                const operandValueInput = screen.getByLabelText('Operand Value');
    
                const removeAssignmentButton = screen.getByText('Remove');
    
                fireEvent.click(removeAssignmentButton);
    
                expect(variableSelect).not.toBeInTheDocument();
                expect(operatorSelect).not.toBeInTheDocument();
                expect(operandTypeSelect).not.toBeInTheDocument();
                expect(operandValueInput).not.toBeInTheDocument();
            });
        });
    });

    // it('Should allow user to change values', () => {
    //     const variables = [];

    //     const assignElement = {
    //         id: 'assign-1',
    //         type: 'assign',
    //         name: 'Assign',
    //         description: 'This is an assign element.',
    //         assignments: [],
    //     };

    //     render(
    //         <AssignElementSidebar
    //             assignElement={assignElement}
    //             variables={variables}
    //         />
    //     );

    //     const nameInput = screen.getByLabelText('Name');
    //     const descriptionInput = screen.getByLabelText('Description');

    //     fireEvent.change(nameInput, { target: { value: 'Changed Assign' } });
    //     fireEvent.change(descriptionInput, { target: { value: 'This is a changed assign element.' } });

    //     expect(nameInput).toHaveValue('Changed Assign');
    //     expect(descriptionInput).toHaveValue('This is a changed assign element.');
    // });

    // it('Should allow user to confirm changed values', () => {
    //     const variables = [];

    //     const assignElement = {
    //         id: 'assign-1',
    //         type: 'assign',
    //         name: 'Assign',
    //         description: 'This is an assign element.',
    //         assignments: [],
    //     };

    //     const onConfirm = vi.fn();

    //     render(
    //         <AssignElementSidebar
    //             assignElement={assignElement}
    //             variables={variables}
    //             onConfirm={onConfirm}
    //         />
    //     );

    //     const nameInput = screen.getByLabelText('Name');
    //     const descriptionInput = screen.getByLabelText('Description');

    //     fireEvent.change(nameInput, { target: { value: 'Changed Assign' } });
    //     fireEvent.change(descriptionInput, { target: { value: 'This is a changed assign element.' } });

    //     const confirmButton = screen.getByText('Confirm');

    //     fireEvent.click(confirmButton);

    //     expect(onConfirm).toHaveBeenCalledWith({
    //         id: 'assign-1',
    //         name: 'Changed Assign',
    //         description: 'This is a changed assign element.',
    //         assignments: [],
    //     });
    // });

    // it('Should allow user to add assignments', () => {
    //     const variables = [
    //         { id: 'variable-1', name: 'Variable 1' },
    //         { id: 'variable-2', name: 'Variable 2' },
    //     ];

    //     const assignElement = {
    //         id: 'assign-1',
    //         type: 'assign',
    //         name: 'Assign',
    //         description: 'This is an assign element.',
    //         assignments: [],
    //     };

    //     render(
    //         <AssignElementSidebar
    //             assignElement={assignElement}
    //             variables={variables}
    //         />
    //     );

    //     const addAssignmentButton = screen.getByText('Add assignment');

    //     fireEvent.click(addAssignmentButton);

    //     expect(screen.getByLabelText('Variable')).toHaveValue('variable-1');
    //     expect(screen.getByLabelText('Operator')).toHaveValue('set');
    //     expect(screen.getByLabelText('Operand Type')).toHaveValue('variable');
    //     expect(screen.getByLabelText('Operand Variable')).toHaveValue('variable-1');
    // });

    // it('Should allow user to confirm added assignments', () => {
    //     const variables = [
    //         { id: 'variable-1', name: 'Variable 1' },
    //         { id: 'variable-2', name: 'Variable 2' },
    //     ];

    //     const assignElement = {
    //         id: 'assign-1',
    //         type: 'assign',
    //         name: 'Assign',
    //         description: 'This is an assign element.',
    //         assignments: [],
    //     };

    //     const handleConfirm = vi.fn();

    //     render(
    //         <AssignElementSidebar
    //             assignElement={assignElement}
    //             variables={variables}
    //             onConfirm={handleConfirm}
    //         />
    //     );

    //     const addAssignmentButton = screen.getByText('Add assignment');

    //     fireEvent.click(addAssignmentButton);

    //     const confirmButton = screen.getByText('Confirm');

    //     fireEvent.click(confirmButton);

    //     expect(handleConfirm).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             assignments: [
    //                 {
    //                     id: expect.any(String),
    //                     variableId: 'variable-1',
    //                     operator: 'set',
    //                     operand: {
    //                         type: 'variable',
    //                         variableId: 'variable-1',
    //                     },
    //                 },
    //             ],
    //         })
    //     );
    // });

    // it('Should allow user to change assignment values', () => {
    //     const variables = [
    //         { id: 'variable-1', name: 'Variable 1' },
    //         { id: 'variable-2', name: 'Variable 2' },
    //     ];

    //     const assignElement = {
    //         id: 'assign-1',
    //         type: 'assign',
    //         name: 'Assign',
    //         description: 'This is an assign element.',
    //         assignments: [
    //             {
    //                 id: 'assignment-1',
    //                 variableId: 'variable-1',
    //                 operator: 'set',
    //                 operand: {
    //                     type: 'variable',
    //                     variableId: 'variable-1',
    //                 },
    //             },
    //         ],
    //     };

    //     render(
    //         <AssignElementSidebar
    //             assignElement={assignElement}
    //             variables={variables}
    //         />
    //     );

    //     const variableSelect = screen.getByLabelText('Variable');
    //     const operatorSelect = screen.getByLabelText('Operator');
    //     const operandTypeSelect = screen.getByLabelText('Operand Type');

    //     fireEvent.change(variableSelect, { target: { value: 'variable-2' } });
    //     fireEvent.change(operatorSelect, { target: { value: 'increment' } });
    //     fireEvent.change(operandTypeSelect, { target: { value: 'value' } });

    //     const operandValueInput = screen.getByLabelText('Operand Value');

    //     fireEvent.change(operandValueInput, { target: { value: '10' } });

    //     expect(variableSelect).toHaveValue('variable-2');
    //     expect(operatorSelect).toHaveValue('increment');
    //     expect(operandTypeSelect).toHaveValue('value');
    //     expect(operandValueInput).toHaveValue('10');
    // });

    // it('Should allow user to confirm changed assignments', () => {
    //     const variables = [
    //         { id: 'variable-1', name: 'Variable 1' },
    //         { id: 'variable-2', name: 'Variable 2' },
    //     ];

    //     const assignElement = {
    //         id: 'assign-1',
    //         type: 'assign',
    //         name: 'Assign',
    //         description: 'This is an assign element.',
    //         assignments: [
    //             {
    //                 id: 'assignment-1',
    //                 variableId: 'variable-1',
    //                 operator: 'set',
    //                 operand: {
    //                     type: 'variable',
    //                     variableId: 'variable-1',
    //                 },
    //             },
    //         ],
    //     };

    //     const handleConfirm = vi.fn();

    //     render(
    //         <AssignElementSidebar
    //             assignElement={assignElement}
    //             variables={variables}
    //             onConfirm={handleConfirm}
    //         />
    //     );

    //     const variableSelect = screen.getByLabelText('Variable');
    //     const operatorSelect = screen.getByLabelText('Operator');
    //     const operandTypeSelect = screen.getByLabelText('Operand Type');

    //     fireEvent.change(variableSelect, { target: { value: 'variable-2' } });
    //     fireEvent.change(operatorSelect, { target: { value: 'increment' } });
    //     fireEvent.change(operandTypeSelect, { target: { value: 'value' } });

    //     const operandValueInput = screen.getByLabelText('Operand Value');

    //     fireEvent.change(operandValueInput, { target: { value: '10' } });

    //     const confirmButton = screen.getByText('Confirm');

    //     fireEvent.click(confirmButton);

    //     expect(handleConfirm).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             assignments: [
    //                 {
    //                     id: 'assignment-1',
    //                     variableId: 'variable-2',
    //                     operator: 'increment',
    //                     operand: {
    //                         type: 'value',
    //                         value: null,
    //                     },
    //                 },
    //             ],
    //         })
    //     );
    // });
});