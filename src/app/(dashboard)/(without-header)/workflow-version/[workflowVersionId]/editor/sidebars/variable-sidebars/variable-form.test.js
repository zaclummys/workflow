import { screen, render, act, fireEvent } from '@testing-library/react';

import VariableForm from './variable-form';

describe('Variable Form', () => {
    it('Should render default values', () => {
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
    
    it('Should allow to create a string variable', () => {
        const handleConfirm = vi.fn();
        
        render(
            <VariableForm
                onConfirm={handleConfirm}
            />
        );
        
        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const typeSelect = screen.getByLabelText('Type');
        
        fireEvent.change(nameInput, { target: { value: 'String Variable' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a string variable.' } });
        fireEvent.change(typeSelect, { target: { value: 'string' } });
        
        const defaultValueInput = screen.getByLabelText('Default Value');
        
        fireEvent.change(defaultValueInput, { target: { value: 'abc' } });
        
        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);
        
        expect(handleConfirm).toHaveBeenCalledWith({
            name: 'String Variable',
            description: 'This is a string variable.',
            type: 'string',
            defaultValue: 'abc',
            markedAsInput: true,
            markedAsOutput: true,
        });
    });
    
    it('Should allow to create a number variable', () => {
        const handleConfirm = vi.fn();
        
        render(
            <VariableForm
                onConfirm={handleConfirm}
            />
        );
        
        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const typeSelect = screen.getByLabelText('Type');
        
        fireEvent.change(nameInput, { target: { value: 'Number Variable' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a number variable.' } });
        fireEvent.change(typeSelect, { target: { value: 'number' } });
        
        const defaultValueInput = screen.getByLabelText('Default Value');
        
        fireEvent.change(defaultValueInput, { target: { value: '123' } });
        
        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);
        
        expect(handleConfirm).toHaveBeenCalledWith({
            name: 'Number Variable',
            description: 'This is a number variable.',
            type: 'number',
            defaultValue: 123,
            markedAsInput: true,
            markedAsOutput: true,
        });
    });
    
    it('Should allow to create a boolean variable', () => {
        const handleConfirm = vi.fn();
        
        render(
            <VariableForm
                onConfirm={handleConfirm}
            />
        );
        
        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const typeSelect = screen.getByLabelText('Type');
        
        fireEvent.change(nameInput, { target: { value: 'Boolean Variable' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a boolean variable.' } });
        fireEvent.change(typeSelect, { target: { value: 'boolean' } });
        
        const defaultValueInput = screen.getByLabelText('Default Value');
        
        fireEvent.change(defaultValueInput, { target: { value: 'false' } });
        
        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);
        
        expect(handleConfirm).toHaveBeenCalledWith({
            name: 'Boolean Variable',
            description: 'This is a boolean variable.',
            type: 'boolean',
            defaultValue: false,
            markedAsInput: true,
            markedAsOutput: true,
        });
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
    
    it('Should not allow to confirm before filling the name', () => {
        const onConfirm = vi.fn();

        render(
            <VariableForm
                onConfirm={onConfirm}
            />
        );

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(onConfirm).not.toHaveBeenCalled();
    });

    it('Should allow to confirm after filling the name', () => {
        const onConfirm = vi.fn();

        render(
            <VariableForm
                onConfirm={onConfirm}
            />
        );

        const nameInput = screen.getByLabelText('Name');

        fireEvent.change(nameInput, { target: { value: 'Variable 1' } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(onConfirm).toHaveBeenCalled();
    });

    it('Should render a string variable with initial values', () => {
        const variable = {
            name: 'String Variable',
            description: 'This is a string variable.',
            type: 'string',
            defaultValue: 'abc',
            markedAsInput: false,
            markedAsOutput: false,
        };

        render(
            <VariableForm
                variable={variable}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const typeSelect = screen.getByLabelText('Type');
        const defaultValueInput = screen.getByLabelText('Default Value');
        const markedAsInputCheckbox = screen.getByLabelText('Allow this variable to be available as input.');
        const markedAsOutputCheckbox = screen.getByLabelText('Allow this variable to be available as output.');

        expect(nameInput.value).toBe('String Variable');
        expect(descriptionInput.value).toBe('This is a string variable.');
        expect(typeSelect.value).toBe('string');
        expect(defaultValueInput.value).toBe('abc');
        expect(markedAsInputCheckbox.checked).toBe(false);
        expect(markedAsOutputCheckbox.checked).toBe(false);
    });
    
    it('Should a number variable with initial values', () => {
        const variable = {
            name: 'Number Variable',
            description: 'This is a number variable.',
            type: 'number',
            defaultValue: 123,
            markedAsInput: false,
            markedAsOutput: false,
        };

        render(
            <VariableForm
                variable={variable}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const typeSelect = screen.getByLabelText('Type');
        const defaultValueInput = screen.getByLabelText('Default Value');
        const markedAsInputCheckbox = screen.getByLabelText('Allow this variable to be available as input.');
        const markedAsOutputCheckbox = screen.getByLabelText('Allow this variable to be available as output.');

        expect(nameInput.value).toBe('Number Variable');
        expect(descriptionInput.value).toBe('This is a number variable.');
        expect(typeSelect.value).toBe('number');
        expect(defaultValueInput.value).toBe('123');
        expect(markedAsInputCheckbox.checked).toBe(false);
        expect(markedAsOutputCheckbox.checked).toBe(false);
    });
    
    it('Should a boolean variable with initial values', () => {
        const variable = {
            name: 'Boolean Variable',
            description: 'This is a boolean variable.',
            type: 'boolean',
            defaultValue: true,
            markedAsInput: false,
            markedAsOutput: false,
        };

        render(
            <VariableForm
                variable={variable}
            />
        );

        const nameInput = screen.getByLabelText('Name');
        const descriptionInput = screen.getByLabelText('Description');
        const typeSelect = screen.getByLabelText('Type');
        const defaultValueInput = screen.getByLabelText('Default Value');
        const markedAsInputCheckbox = screen.getByLabelText('Allow this variable to be available as input.');
        const markedAsOutputCheckbox = screen.getByLabelText('Allow this variable to be available as output.');

        expect(nameInput.value).toBe('Boolean Variable');
        expect(descriptionInput.value).toBe('This is a boolean variable.');
        expect(typeSelect.value).toBe('boolean');
        expect(defaultValueInput.value).toBe('true');
        expect(markedAsInputCheckbox.checked).toBe(false);
        expect(markedAsOutputCheckbox.checked).toBe(false);
    });
});