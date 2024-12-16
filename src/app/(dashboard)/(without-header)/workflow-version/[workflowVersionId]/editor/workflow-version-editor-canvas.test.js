import '@testing-library/jest-dom/vitest';

import { screen, render, fireEvent, act } from '@testing-library/react';

import WorkflowVersionEditorCanvas from './workflow-version-editor-canvas';

describe('Workflow Version Editor Canvas', () => {
    beforeAll(() => {
        global.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    });

    const ifElement = {
        id: 'if-element',
        type: 'if',
        name: 'If',
        position: { x: 200, y: 200 }
    };

    const assignElement = {
        id: 'assign-element',
        type: 'assign',
        name: 'Assign',
        position: { x: 300, y: 300 }
    };

    const workflowVersion = {
        id: 'workflow-version-1',
        elements: [
            {
                id: 'element-1',
                type: 'start',
                position: { x: 100, y: 100 }
            },

            ifElement,
            assignElement,
        ]
    };

    it('Should render start element', () => {
        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
            />
        );

        screen.getByText('Start');
    });

    it('Should render if element', () => {
        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
            />
        );

        screen.getByText('If');
    });

    it('Should render assign element', () => {
        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
            />
        );

        screen.getByText('Assign');
    });

    it('Should allow user to select an if element', () => {
        const handleElementSelect = vi.fn();

        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
                onElementSelect={handleElementSelect}
            />
        );

        const ifNode = screen.getByText('If');

        fireEvent.dblClick(ifNode);

        expect(handleElementSelect).toHaveBeenCalledWith(ifElement);
    });

    it('Should allow user to select an assign element', () => {
        const handleElementSelect = vi.fn();

        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
                onElementSelect={handleElementSelect}
            />
        );

        const assignNode = screen.getByText('Assign');

        fireEvent.dblClick(assignNode);

        expect(handleElementSelect).toHaveBeenCalledWith(assignElement);
    });
});