import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

import IfElementSidebar from './if-element-sidebar';

describe('If Element Sidebar', () => {
    it('Should render with initial values', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is an if element.',
            strategy: 'all',
            conditions: [],
        };

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
            />
        );
        
        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const strategyInput = screen.getByLabelText('Strategy');
        
        expect(nameInput.value).toBe('If');
        expect(descriptionInput.value).toBe('This is an if element.');
        expect(strategyInput.value).toBe('all');
    });

    it('Should not allow user to add a condition if there are no variables', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        render(
            <IfElementSidebar
                ifElement={ifElement}
                variables={variables}
            />
        );

        const addConditionButton = screen.getByText('Add condition');

        expect(addConditionButton).toBeDisabled();
    });
    
    it('Should allow user to add a condition if there are variables', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'string',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
            />
        );

        const addConditionButton = screen.getByText('Add condition');

        expect(addConditionButton).not.toBeDisabled();
    });

    it('Should allow user to submit when there are no conditions', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalled();
    });

    it('Should allow user to change details and confirm', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const strategyInput = screen.getByLabelText('Strategy');

        fireEvent.change(nameInput, { target: { value: 'Changed If' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a changed description.' } });
        fireEvent.change(strategyInput, { target: { value: 'any' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Changed If',
                description: 'This is a changed description.',
                strategy: 'any',
            })
        );
    });

    it('Should allow user to change condition variable and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },

            {
                id: 'variable-2',
                type: 'number',
                name: 'Variable 2',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionVariableSelect = screen.getByLabelText('Variable');

        fireEvent.change(conditionVariableSelect, { target: { value: 'variable-2' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-2',
                        operator: 'equal',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-2',
                        },
                    },
                ],
            })
        );
    });

    it('Should allow user to change condition operator and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            }
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperatorSelect = screen.getByLabelText('Operator');

        fireEvent.change(conditionOperatorSelect, { target: { value: 'greater-than' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-1',
                        operator: 'greater-than',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-1',
                        },
                    },
                ],
            })
        );
    });

    it('Should allow user to change condition operand type to value and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperandType = screen.getByLabelText('Operand Type');

        fireEvent.change(conditionOperandType, { target: { value: 'value' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: 0,
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand type to variable and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 0,
                        },
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperandType = screen.getByLabelText('Operand Type');

        fireEvent.change(conditionOperandType, { target: { value: 'variable' } });

        const conditionOperandVariableSelect = screen.getByLabelText('Operand Variable');

        expect(conditionOperandVariableSelect.value).toBe('variable-1');

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'variable',
                            variableId: 'variable-1',
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand variable and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },

            {
                id: 'variable-2',
                type: 'number',
                name: 'Variable 2',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperandVariableSelect = screen.getByLabelText('Operand Variable');

        fireEvent.change(conditionOperandVariableSelect, { target: { value: 'variable-2' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'variable',
                            variableId: 'variable-2',
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand number and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'number',
                            number: 0,
                        },
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperandValue = screen.getByLabelText('Operand Value');

        fireEvent.change(conditionOperandValue, { target: { value: '1' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: 1,
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand string and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'string',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: 'abc',
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperandValue = screen.getByLabelText('Operand Value');

        fireEvent.change(conditionOperandValue, { target: { value: 'xyz' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: 'xyz',
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand boolean and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'boolean',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: false,
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const conditionOperandValue = screen.getByLabelText('Operand Value');

        fireEvent.change(conditionOperandValue, { target: { value: 'true' } });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: true,
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to add a condition and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const addConditionButton = screen.getByText('Add condition');

        act(() => {
            addConditionButton.click();
        });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: expect.any(String),
                        variableId: 'variable-1',
                        operator: 'equal',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-1',
                        }
                    }
                ],
            })
        );
    });
    
    it('Should allow user to add a condition with number and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const addConditionButton = screen.getByText('Add condition');

        act(() => {
            addConditionButton.click();
        });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: expect.any(String),
                        variableId: 'variable-1',
                        operator: 'equal',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-1',
                        }
                    }
                ],
            })
        );
    });
    
    it('Should allow user to remove a condition and confirm', () => {
        const variables = [
            {
                id: 'variable-1',
                type: 'number',
                name: 'Variable 1',
            },
        ];

        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [
                {
                    id: 'condition-1',
                    variableId: 'variable-1',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onConfirm = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onConfirm={onConfirm}
            />
        );

        const removeConditionButton = screen.getByText('Remove');

        act(() => {
            removeConditionButton.click();
        });

        const confirmButton = screen.getByText('Confirm');

        confirmButton.click();

        expect(onConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [],
            })
        );
    });

    it('Should allow user to cancel', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onCancel = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onCancel={onCancel}
            />
        );

        const cancelButton = screen.getByText('Cancel');

        cancelButton.click();

        expect(onCancel).toHaveBeenCalled();
    });
    
    describe('Condition', () => {
        it('Should have default values', () => {
            const variables = [
                {
                    id: 'variable-1',
                    type: 'string',
                    name: 'Variable 1',
                },
            ];
    
            const ifElement = {
                id: 'if-1',
                type: 'if',
                name: 'If',
                description: 'This is a description.',
                strategy: 'all',
                conditions: [],
            };
    
            render(
                <IfElementSidebar
                    variables={variables}
                    ifElement={ifElement}
                />
            );
    
            const addConditionButton = screen.getByText('Add condition');
    
            act(() => {
                addConditionButton.click();
            });
    
            const variableSelect = screen.getByLabelText('Variable');
            const operatorSelect = screen.getByLabelText('Operator');
            const operandTypeSelect = screen.getByLabelText('Operand Type');
            const operandVariableSelect = screen.getByLabelText('Operand Variable');
    
            expect(variableSelect.value).toBe('variable-1');
            expect(operatorSelect.value).toBe('equal');
            expect(operandTypeSelect.value).toBe('variable');
            expect(operandVariableSelect.value).toBe('variable-1');
        });
    });
});