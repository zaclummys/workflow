import { screen, render, act, fireEvent } from '@testing-library/react';

import VariableForm from './variable-form';

describe('Variable Form', () => {
    it('Should render without initial variable', () => {
        render(
            <VariableForm />
        );
    });

    describe('Without initial variable', () => {
        it('Should render with default values', () => {
            render(
                <VariableForm />
            );

            const nameInput = screen.getByLabelText('Name');
            const descriptionInput = screen.getByLabelText('Description');
            const typeSelect = screen.getByLabelText('Type');
            const markedAsInputCheckbox = screen.getByLabelText('Allow this variable to be available as input.');
            const markedAsOutputCheckbox = screen.getByLabelText('Allow this variable to be available as output.');

            expect(nameInput.value).toBe('');
            expect(descriptionInput.value).toBe('');
            expect(typeSelect.value).toBe('string');
            expect(markedAsInputCheckbox.checked).toBe(true);
            expect(markedAsOutputCheckbox.checked).toBe(true);
        });

        it('Should allow to cancel', () => {
            const onCancel = vi.fn();

            render(
                <VariableForm
                    onCancel={onCancel}
                />
            );

            const cancelButton = screen.getByText('Cancel');

            fireEvent.click(cancelButton);

            expect(onCancel).toHaveBeenCalled();
        });

        it('Should allow to confirm after filling the required fields', () => {
            const onConfirm = vi.fn();

            render(
                <VariableForm
                    onConfirm={onConfirm}
                />
            );

            const nameInput = screen.getByLabelText('Name');

            fireEvent.change(nameInput, { target: { value: 'Variable 1' } });

            const confirmButton = screen.getByText('Confirm');

            act(() => {
                fireEvent.click(confirmButton);
            });

            expect(onConfirm).toHaveBeenCalled();
        });
    });

    describe('With initial variable', () => {
        describe('String', () => {
            it('Should render with initial values', () => {
                const initialVariable = {
                    type: 'string',
                    defaultValue: 'The default value.',
                };

                render(
                    <VariableForm
                        variable={initialVariable}
                    />
                );

                const typeSelect = screen.getByLabelText('Type');
                const defaultValueInput = screen.getByLabelText('Default Value');

                expect(typeSelect.value).toBe('string');
                expect(defaultValueInput.value).toBe('The default value.');
            });

            it('Should allow to change the default value', () => {
                const initialVariable = {
                    type: 'string',
                    defaultValue: {
                        type: 'string',
                        string: 'The default value.',
                    },
                };

                render(
                    <VariableForm
                        variable={initialVariable}
                    />
                );

                const defaultValueInput = screen.getByLabelText('Default Value');

                fireEvent.change(defaultValueInput, { target: { value: 'The new default value.' } });

                expect(defaultValueInput.value).toBe('The new default value.');
            });
        });

        describe('Number', () => {
            it('Should render with initial values', () => {
                const initialVariable = {
                    type: 'number',
                    defaultValue: '42',
                };

                render(
                    <VariableForm
                        variable={initialVariable}
                    />
                );
                
                const typeSelect = screen.getByLabelText('Type');
                const defaultValueInput = screen.getByLabelText('Default Value');

                expect(typeSelect.value).toBe('number');
                expect(defaultValueInput.value).toBe('42');
            });

            it('Should allow to change the default value', () => {
                const initialVariable = {
                    type: 'number',
                    defaultValue: {
                        type: 'number',
                        number: 42,
                    },
                };

                render(
                    <VariableForm
                        variable={initialVariable}
                    />
                );
                
                const defaultValueInput = screen.getByLabelText('Default Value');

                fireEvent.change(defaultValueInput, { target: { value: '43' } });

                expect(defaultValueInput.value).toBe('43');
            });
        });

        describe('Boolean', () => {
            describe('True', () => {
                it('Should render with initial values', () => {
                    const initialVariable = {
                        type: 'boolean',
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
                    };

                    render(
                        <VariableForm
                            variable={initialVariable}
                        />
                    );
                    
                    const typeSelect = screen.getByLabelText('Type');
                    const defaultValueInput = screen.getByLabelText('Default Value');

                    expect(typeSelect.value).toBe('boolean');
                    expect(defaultValueInput.value).toBe('true');
                });

                it('Should allow to change the default value', () => {
                    const initialVariable = {
                        type: 'boolean',
                        defaultValue: {
                            type: 'boolean',
                            boolean: true,
                        },
                    };

                    render(
                        <VariableForm
                            variable={initialVariable}
                        />
                    );
                    
                    const defaultValueInput = screen.getByLabelText('Default Value');

                    fireEvent.change(defaultValueInput, { target: { value: 'false' } });

                    expect(defaultValueInput.value).toBe('false');
                });

                it('Should allow to confirm after change the default value', () => {
                    const initialVariable = {
                        id: 'variable-1',
                        name: 'Variable 1',
                        description: 'This is the first variable.',
                        type: 'boolean',
                        defaultValue: 'false',
                    };

                    const onConfirm = vi.fn();

                    render(
                        <VariableForm
                            variable={initialVariable}
                            onConfirm={onConfirm}
                        />
                    );

                    const defaultValueInput = screen.getByLabelText('Default Value');
                    const confirmButton = screen.getByText('Confirm');

                    fireEvent.change(defaultValueInput, { target: { value: 'true' } });

                    act(() => {
                        fireEvent.click(confirmButton);
                    });

                    expect(onConfirm).toHaveBeenCalledWith(
                        expect.objectContaining({
                            defaultValue: 'true',
                        })
                    );
                });
            });

            describe('False', () => {
                it('Should render with initial values', () => {
                    const initialVariable = {
                        type: 'boolean',
                        defaultValue: 'false',
                    };

                    render(
                        <VariableForm
                            variable={initialVariable}
                        />
                    );
                    
                    const typeSelect = screen.getByLabelText('Type');
                    const defaultValueInput = screen.getByLabelText('Default Value');

                    expect(typeSelect.value).toBe('boolean');
                    expect(defaultValueInput.value).toBe('false');
                });

                it('Should allow to change the default value', () => {
                    const initialVariable = {
                        type: 'boolean',
                        defaultValue: 'false',
                    };

                    render(
                        <VariableForm
                            variable={initialVariable}
                        />
                    );
                    
                    const defaultValueInput = screen.getByLabelText('Default Value');

                    fireEvent.change(defaultValueInput, { target: { value: 'true' } });

                    expect(defaultValueInput.value).toBe('true');
                });

                it('Should allow to confirm after change the default value', () => {
                    const initialVariable = {
                        id: 'variable-1',
                        name: 'Variable 1',
                        description: 'This is the first variable.',
                        type: 'boolean',
                        defaultValue: 'true',
                    };

                    const onConfirm = vi.fn();

                    render(
                        <VariableForm
                            variable={initialVariable}
                            onConfirm={onConfirm}
                        />
                    );

                    const defaultValueInput = screen.getByLabelText('Default Value');
                    const confirmButton = screen.getByText('Confirm');

                    fireEvent.change(defaultValueInput, { target: { value: 'false' } });

                    act(() => {
                        fireEvent.click(confirmButton);
                    });

                    expect(onConfirm).toHaveBeenCalledWith(
                        expect.objectContaining({
                            defaultValue: 'false',
                        })
                    );
                });
            });
        });
    });
});