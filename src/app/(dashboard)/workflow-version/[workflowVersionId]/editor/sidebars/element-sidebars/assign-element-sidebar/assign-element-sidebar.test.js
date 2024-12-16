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

    it('Should allow user to confirm', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith({
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        });
    });

    it('Should allow user to cancel', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        const handleCancel = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onCancel={handleCancel}
            />
        );

        const cancelButton = screen.getByText('Cancel');

        fireEvent.click(cancelButton);

        expect(handleCancel).toHaveBeenCalled();
    });  

    it('Should render details with initial values', () => {
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

        expect(nameInput.value).toBe('Assign');
        expect(descriptionInput.value).toBe('This is an assign element.');
    });

    it('Should allow user to change details', () => {
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

        expect(nameInput.value).toBe('Changed Assign');
        expect(descriptionInput.value).toBe('This is a changed assign element.');
    });

    it('Should allow user to change details and confirm', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');

        fireEvent.change(nameInput, { target: { value: 'Changed Assign' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a changed assign element.' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Changed Assign',
                description: 'This is a changed assign element.',
            }),
        );
    });

    it('Should allow user to add an assignment and confirm', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const addAssignmentButton = screen.getByText('Add assignment');

        fireEvent.click(addAssignmentButton);

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: expect.any(String),
                        variableId: 'variable-string-1',
                        operator: 'set',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-string-1',
                        }
                    }
                ],
            }),
        );
    });

    it('Should allow user to edit condition variable and confirm', () => {
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
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const variableSelect = screen.getByLabelText('Variable (Target)');

        fireEvent.change(variableSelect, { target: { value: 'variable-string-2' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-string-2',
                        operator: 'set',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-string-2',
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to edit condition operator and confirm', () => {
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
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const operatorSelect = screen.getByLabelText('Operator');

        fireEvent.change(operatorSelect, { target: { value: 'increment' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-number-1',
                        operator: 'increment',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-number-1',
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to edit condition operand type from variable to value and confirm', () => {
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
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const operandTypeSelect = screen.getByLabelText('Operand Type');

        fireEvent.change(operandTypeSelect, { target: { value: 'value' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-boolean-1',
                        operator: 'set',
                        operand: {
                            type: 'value',
                            value: false,
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to edit condition operand type from value to variable and confirm', () => {
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
                        type: 'value',
                        value: false,
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const operandTypeSelect = screen.getByLabelText('Operand Type');

        fireEvent.change(operandTypeSelect, { target: { value: 'variable' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-boolean-1',
                        operator: 'set',
                        operand: {
                            type: 'variable',
                            variableId: 'variable-boolean-1',
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to edit condition operand string and confirm', () => {
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
                        value: 'Initial Value',
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const operandValueInput = screen.getByLabelText('Operand Value (Source)');

        fireEvent.change(operandValueInput, { target: { value: 'Changed Value' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-string-1',
                        operator: 'set',
                        operand: {
                            type: 'value',
                            value: 'Changed Value',
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to edit condition operand boolean and confirm', () => {
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
                        type: 'value',
                        value: false,
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const operandValueSelect = screen.getByLabelText('Operand Value (Source)');

        fireEvent.change(operandValueSelect, { target: { value: 'true' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-boolean-1',
                        operator: 'set',
                        operand: {
                            type: 'value',
                            value: true,
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to edit condition operand number and confirm', () => {
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
                        value: '0',
                    }
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const operandValueInput = screen.getByLabelText('Operand Value (Source)');

        fireEvent.change(operandValueInput, { target: { value: '123' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [
                    {
                        id: 'assignment-1',
                        variableId: 'variable-number-1',
                        operator: 'set',
                        operand: {
                            type: 'value',
                            value: 123,
                        }
                    },
                ],
            }),
        );
    });

    it('Should allow user to remove an assignment and confirm', () => {
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
                    }
                }
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onConfirm={handleConfirm}
            />
        );

        const removeAssignmentButton = screen.getByTitle('Remove assignment');

        fireEvent.click(removeAssignmentButton);

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith(
            expect.objectContaining({
                assignments: [],
            }),
        );
    });

    it('Should show an alert when a assignment is referecing a variable that does not exist anymore', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [
                {
                    id: 'assignment-1',
                    variableId: 'variable-unknown-1',
                    operator: 'set',
                    operand: {
                        type: 'variable',
                        variableId: 'variable-unknown-1',
                    }
                }
            ],
        };

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
            />
        );

        const alert = screen.getByText('Assignment variable `variable-unknown-1` does not exist anymore.');

        expect(alert).toBeInTheDocument();
    });

    it('Should allow user to remove the assign element', () => {
        const assignElement = {
            id: 'assign-1',
            type: 'assign',
            name: 'Assign',
            description: 'This is an assign element.',
            assignments: [],
        };

        const onRemove = vi.fn();

        render(
            <AssignElementSidebar
                assignElement={assignElement}
                variables={variables}
                onRemove={onRemove}
            />
        );

        const removeButton = screen.getByText('Remove');

        fireEvent.click(removeButton);

        expect(onRemove).toHaveBeenCalledWith('assign-1');
    });
});