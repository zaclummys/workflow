import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';

import IfElementSidebar from './if-element-sidebar';

describe('If Element Sidebar', () => {
    it('Should render', () => {
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
                variables={variables}
                ifElement={ifElement}
            />
        );
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

    it('Condition should have default values', () => {
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

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const addConditionButton = screen.getByText('Add condition');

        act(() => {
            addConditionButton.click();
        });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: expect.any(String),
                        variableId: 'variable-1',
                        variableType: 'string',
                        operator: 'equal',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-1',
                        },
                    },
                ],
            })
        );
    });

    it('Should allow user to submit if there are no variables', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith({
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        });
    });

    it('Should allow user to submit if there are variables', () => {
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

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith({
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        });
    });

    it('Should allow user to change details and submit', () => {
        const variables = [];
        const ifElement = {
            id: 'if-1',
            type: 'if',
            name: 'If',
            description: 'This is a description.',
            strategy: 'all',
            conditions: [],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const strategyInput = screen.getByLabelText('Strategy');

        fireEvent.change(nameInput, { target: { value: 'Changed If' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a changed description.' } });
        fireEvent.change(strategyInput, { target: { value: 'any' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Changed If',
                description: 'This is a changed description.',
                strategy: 'any',
            })
        );
    });

    it('Should allow user to change condition variable and submit', () => {
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
                    variableType: 'number',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionVariableSelect = screen.getByLabelText('Variable');

        fireEvent.change(conditionVariableSelect, { target: { value: 'variable-2' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-2',
                        variableType: 'number',
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

    it('Should allow user to change condition operator and submit', () => {
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
                    variableType: 'number',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionOperatorSelect = screen.getByLabelText('Operator');

        fireEvent.change(conditionOperatorSelect, { target: { value: 'greater-than' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    {
                        id: 'condition-1',
                        variableId: 'variable-1',
                        variableType: 'number',
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

    it('Should allow user to change condition operand type to value and submit', () => {
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
                    variableType: 'number',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionOperandType = screen.getByLabelText('Operand Type');

        fireEvent.change(conditionOperandType, { target: { value: 'value' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: {
                                type: 'number',
                                number: 0,
                            },
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand type to variable and submit', () => {
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
                    variableType: 'number',
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

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionOperandType = screen.getByLabelText('Operand Type');

        fireEvent.change(conditionOperandType, { target: { value: 'variable' } });

        const conditionOperandVariableSelect = screen.getByLabelText('Operand Variable');

        expect(conditionOperandVariableSelect.value).toBe('variable-1');

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
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

    it('Should allow user to change condition operand number and submit', () => {
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
                    variableType: 'number',
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

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionOperandValue = screen.getByLabelText('Operand Value');

        fireEvent.change(conditionOperandValue, { target: { value: '1' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: {
                                type: 'number',
                                number: 1,
                            },
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand string and submit', () => {
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
                    variableType: 'string',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'string',
                            string: 'abc',
                        },
                    },
                },
            ],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionOperandValue = screen.getByLabelText('Operand Value');

        fireEvent.change(conditionOperandValue, { target: { value: 'xyz' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: {
                                type: 'string',
                                string: 'xyz',
                            },
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to change condition operand boolean and submit', () => {
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
                    variableType: 'boolean',
                    operator: 'equal',
                    operand: {
                        type: 'value',
                        value: {
                            type: 'boolean',
                            boolean: false,
                        },
                    },
                },
            ],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const conditionOperandValue = screen.getByLabelText('Operand Value');

        fireEvent.change(conditionOperandValue, { target: { value: 'true' } });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [
                    expect.objectContaining({
                        operand: {
                            type: 'value',
                            value: {
                                type: 'boolean',
                                boolean: true,
                            },
                        },
                    }),
                ],
            })
        );
    });

    it('Should allow user to remove a condition and submit', () => {
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
                    variableType: 'number',
                    operator: 'equal',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-1',
                    },
                },
            ],
        };

        const onIfElementEdited = vi.fn();

        render(
            <IfElementSidebar
                variables={variables}
                ifElement={ifElement}
                onIfElementEdited={onIfElementEdited}
            />
        );

        const removeConditionButton = screen.getByText('Remove');

        act(() => {
            removeConditionButton.click();
        });

        const applyButton = screen.getByText('Apply');

        applyButton.click();

        expect(onIfElementEdited).toHaveBeenCalledWith(
            expect.objectContaining({
                conditions: [],
            })
        );
    });
});