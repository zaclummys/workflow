import '@testing-library/jest-dom/vitest';

import { render, screen, act, fireEvent } from '@testing-library/react';

import WorkflowVersionEditor from './workflow-version-editor';

describe('Workflow Version Editor Sidebar', () => {
    beforeEach(() => {
        global.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    });

    it('Should render with details', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
                description: 'This is the first workflow.',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );

        screen.getByText('Version 1');
        screen.getByText('Workflow 1');
    });

    it('Should not allow user to save workflow version when there is no change', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );

        const saveButton = screen.getByText('Save');

        expect(saveButton).toBeDisabled();
    });

    it('Should allow user to open variables sidebar', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables', {
            selector: 'button',
        });

        act(() => {
            fireEvent.click(variablesButton);
        });

        screen.getByText('Variables', {
            selector: 'span',
        });
    });

    it('Should allow user to close variables sidebar', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables', {
            selector: 'button',
        });

        act(() => {
            fireEvent.click(variablesButton);
        });

        screen.getByText('Variables', {
            selector: 'span',
        });

        const closeSidebarButton = screen.getByText('Close');

        act(() => {
            fireEvent.click(closeSidebarButton);
        });

        expect(screen.queryByText('Variables', {
            selector: 'span',
        })).toBeNull();
    });

    it('Should allow user to open add variable sidebar', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const addVariableButton = screen.getByText('Add');

        act(() => {
            fireEvent.click(addVariableButton);
        });

        screen.getByText('Add Variable');
    });

    it('Should allow user to confirm add variable', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const addVariableButton = screen.getByText('Add');

        act(() => {
            fireEvent.click(addVariableButton);
        });

        const variableNameInput = screen.getByLabelText('Name');

        act(() => {
            fireEvent.change(variableNameInput, { target: { value: 'Variable 1' } });
        })

        const confirmButton = screen.getByText('Confirm');

        act(() => {
            fireEvent.click(confirmButton);
        });

        screen.getByText('Variables', {
            selector: 'span',
        });

        screen.getByText('Variable 1');
    });

    it('Should allow user to cancel add variable', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const addVariableButton = screen.getByText('Add');

        act(() => {
            fireEvent.click(addVariableButton);
        });

        expect(screen.queryByText('Add Variable')).not.toBeNull();

        const cancelButton = screen.getByText('Cancel');

        act(() => {
            fireEvent.click(cancelButton);
        });

        expect(screen.queryByText('Add Variable')).toBeNull();
    });

    it('Should allow user to open edit variable sidebar', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [
                {
                    id: 'variable-1',
                    name: 'Variable 1',
                },
            ],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const editVariableButton = screen.getByText('Edit');

        act(() => {
            fireEvent.click(editVariableButton);
        });

        screen.getByText('Edit Variable');
    });

    it('Should allow user to confirm edit variable', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is a workflow version.',
            elements: [],
            variables: [
                {
                    id: 'variable-1',
                    name: 'Variable ABC',
                    description: 'This is a variable.',
                    type: 'string',
                    defaultValue: {
                        type: 'string',
                        string: 'ABC',
                    },
                },
            ],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );

        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const editVariableButton = screen.getByText('Edit');

        act(() => {
            fireEvent.click(editVariableButton);
        });

        const confirmButton = screen.getByText('Confirm');

        act(() => {
            fireEvent.click(confirmButton);
        });
    });

    it('Should allow user to cancel edit variable', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is a workflow version.',
            elements: [],
            variables: [
                {
                    id: 'variable-1',
                    name: 'Variable ABC',
                    type: 'string',
                    defaultValue: {
                        type: 'string',
                        string: 'ABC',
                    },
                },
            ],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );

        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const editVariableButton = screen.getByText('Edit');

        act(() => {
            fireEvent.click(editVariableButton);
        });

        const cancelButton = screen.getByText('Cancel');

        act(() => {
            fireEvent.click(cancelButton);
        });

        screen.getByText('Variables', {
            selector: 'span',
        });
    });

    it('Should allow user to open remove variable sidebar', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [],
            variables: [
                {
                    id: 'variable-1',
                    name: 'Variable 1',
                },
            ],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const removeVariableButton = screen.getByText('Remove');

        act(() => {
            fireEvent.click(removeVariableButton);
        });

        screen.getByText('Remove Variable');
    });

    it('Should allow user to confirm remove variable', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is a workflow version.',
            elements: [],
            variables: [
                {
                    id: 'variable-1',
                    name: 'Variable 1',
                },
            ],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );

        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const removeVariableButton = screen.getByText('Remove');

        act(() => {
            fireEvent.click(removeVariableButton);
        });

        const confirmButton = screen.getByText('Confirm');

        act(() => {
            fireEvent.click(confirmButton);
        });

        screen.getByText('Variables', {
            selector: 'span',
        });

        expect(screen.queryByText('Variable 1')).toBeNull();
    });

    it('Should allow user to cancel remove variable', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is a workflow version.',
            elements: [],
            variables: [
                {
                    id: 'variable-1',
                    name: 'Variable 1',
                },
            ],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );

        const variablesButton = screen.getByText('Variables');

        act(() => {
            fireEvent.click(variablesButton);
        });

        const removeVariableButton = screen.getByText('Remove');

        act(() => {
            fireEvent.click(removeVariableButton);
        });

        const cancelButton = screen.getByText('Cancel');

        act(() => {
            fireEvent.click(cancelButton);
        });

        screen.getByText('Variables', {
            selector: 'span',
        });
    });

    it('Should allow user to open edit if element sidebar', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [
                {
                    id: 'element-1',
                    type: 'if',
                    name: 'If Element',
                    description: 'This is an if element.',
                    conditions: [],
                },
            ],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const element = screen.getByText('If Element');

        act(() => {
            fireEvent.dblClick(element);
        });

        screen.getByText('Edit If');
    });

    it('Should allow user to cancel edit if element', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [
                {
                    id: 'element-1',
                    type: 'if',
                    name: 'If Element',
                    description: 'This is an if element.',
                    conditions: [],
                },
            ],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const ifElementNode = screen.getByText('If Element');

        act(() => {
            fireEvent.dblClick(ifElementNode);
        });

        expect(screen.queryByText('Edit If')).not.toBeNull();

        const cancelButton = screen.getByText('Cancel');

        act(() => {
            fireEvent.click(cancelButton);
        });

        expect(screen.queryByText('Edit If')).toBeNull();
    });

    it('Should allow user to confirm edit if element', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [
                {
                    id: 'element-1',
                    type: 'if',
                    name: 'If Element',
                    description: 'This is an if element.',
                    conditions: [],
                },
            ],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const ifElementNode = screen.getByText('If Element');

        act(() => {
            fireEvent.dblClick(ifElementNode);
        });

        expect(screen.queryByText('Edit If')).not.toBeNull();

        const confirmButton = screen.getByText('Confirm');

        act(() => {
            fireEvent.click(confirmButton);
        });

        expect(screen.queryByText('Edit If')).toBeNull();
    });

    it('Should allow user to confirm edit assign element', () => {
        const workflowVersion = {
            id: 'workflow-version-1',
            name: 'Workflow Version 1',
            number: 1,
            description: 'This is the first workflow version.',
            elements: [
                {
                    id: 'element-1',
                    type: 'assign',
                    name: 'Assign Element',
                    description: 'This is an assign element.',
                    assignments: [],
                },
            ],
            variables: [],
            workflow: {
                id: 'workflow-1',
                name: 'Workflow 1',
            },
        };

        render(
            <WorkflowVersionEditor
                workflowVersion={workflowVersion}
            />
        );
        
        const assignElementNode = screen.getByText('Assign Element');

        act(() => {
            fireEvent.dblClick(assignElementNode);
        });

        const editAssignTitle = screen.getByText('Edit Assign');

        const confirmButton = screen.getByText('Confirm');

        act(() => {
            fireEvent.click(confirmButton);
        });

        expect(editAssignTitle).not.toBeInTheDocument();
    });
});