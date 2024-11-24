import '@testing-library/jest-dom/vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import ExecuteWorkflowVersionModal from './execute-workflow-version-modal';

describe('Execute Workflow Version Modal', () => {
    const defaultWorkflowVersion = {
        id: 'workflow-version-1',
        number: 1,
        variables: [],
        workflow: {
            name: 'Workflow X'
        },
    };

    it('Should allow the user to confirm',  () => {
        const handleConfirm = vi.fn();

        render(
            <ExecuteWorkflowVersionModal
                workflowVersion={defaultWorkflowVersion}
                onConfirm={handleConfirm}
            />
        );

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalled();
    });

    it('Should allow the user to cancel',  () => {
        const handleCancel = vi.fn();

        render(
            <ExecuteWorkflowVersionModal
                workflowVersion={defaultWorkflowVersion}
                onCancel={handleCancel}
            />
        );

        const cancelButton = screen.getByText('Cancel');

        fireEvent.click(cancelButton);

        expect(handleCancel).toHaveBeenCalled();
    });

    it('Should render workflow version', () => {
        render(
            <ExecuteWorkflowVersionModal
                workflowVersion={defaultWorkflowVersion}
            />
        );

        const workflowVersionText = screen.getByText('Workflow X - Version 1');
    });

    it('Should render workflow version variables marked as input', () => {
        const workflowVersion = {
            ...defaultWorkflowVersion,
            variables: [
                {
                    id: 'variable-string',
                    type: 'string',
                    name: 'String Variable',
                    defaultValue: 'abc',
                    markedAsInput: true,
                },

                {
                    id: 'variable-number',
                    type: 'number',
                    name: 'Number Variable',
                    defaultValue: 123,
                    markedAsInput: true,
                },

                {
                    id: 'variable-boolean',
                    type: 'boolean',
                    name: 'Boolean Variable',
                    defaultValue: true,
                    markedAsInput: true,
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <ExecuteWorkflowVersionModal
                workflowVersion={workflowVersion}
                onConfirm={handleConfirm}
            />
        );

        screen.getByLabelText('String Variable (string)');
        screen.getByLabelText('Number Variable (number)');
        screen.getByLabelText('Boolean Variable (boolean)');
    });

    it('Should allow user to confirm with default values', () => {
        const workflowVersion = {
            ...defaultWorkflowVersion,
            variables: [
                {
                    id: 'variable-string',
                    type: 'string',
                    name: 'String Variable',
                    defaultValue: 'abc',
                    markedAsInput: true,
                },

                {
                    id: 'variable-number',
                    type: 'number',
                    name: 'Number Variable',
                    defaultValue: 123,
                    markedAsInput: true,
                },

                {
                    id: 'variable-boolean',
                    type: 'boolean',
                    name: 'Boolean Variable',
                    defaultValue: true,
                    markedAsInput: true,
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <ExecuteWorkflowVersionModal
                workflowVersion={workflowVersion}
                onConfirm={handleConfirm}
            />
        );

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith([
            {
                id: 'variable-string',
                value: 'abc',
            },

            {
                id: 'variable-number',
                value: 123,
            },

            {
                id: 'variable-boolean',
                value: true,
            },
        ]);
    });

    it('Should allow user to edit inputs and confirm', () => {
        const workflowVersion = {
            ...defaultWorkflowVersion,
            variables: [
                {
                    id: 'variable-string',
                    type: 'string',
                    name: 'String Variable',
                    defaultValue: 'abc',
                    markedAsInput: true,
                },

                {
                    id: 'variable-number',
                    type: 'number',
                    name: 'Number Variable',
                    defaultValue: 123,
                    markedAsInput: true,
                },

                {
                    id: 'variable-boolean',
                    type: 'boolean',
                    name: 'Boolean Variable',
                    defaultValue: true,
                    markedAsInput: true,
                },
            ],
        };

        const handleConfirm = vi.fn();

        render(
            <ExecuteWorkflowVersionModal
                workflowVersion={workflowVersion}
                onConfirm={handleConfirm}
            />
        );

        const stringInput = screen.getByLabelText('String Variable (string)');
        const numberInput = screen.getByLabelText('Number Variable (number)');
        const booleanInput = screen.getByLabelText('Boolean Variable (boolean)');

        fireEvent.change(stringInput, { target: { value: 'def' } });
        fireEvent.change(numberInput, { target: { value: 456 } });
        fireEvent.change(booleanInput, { target: { value: false } });

        const confirmButton = screen.getByText('Confirm');

        fireEvent.click(confirmButton);

        expect(handleConfirm).toHaveBeenCalledWith([
            {
                id: 'variable-string',
                value: 'def',
            },

            {
                id: 'variable-number',
                value: 456,
            },

            {
                id: 'variable-boolean',
                value: false,
            },
        ]);
    });

    it('Should allow disable buttons while executing', () => {
        render(
            <ExecuteWorkflowVersionModal
                executing={true}
                workflowVersion={defaultWorkflowVersion}
            />
        );

        const confirmButton = screen.getByText('Confirm');
        const cancelButton = screen.getByText('Cancel');

        expect(confirmButton).toBeDisabled();
        expect(cancelButton).toBeDisabled();
    });
});