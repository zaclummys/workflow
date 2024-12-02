import '@testing-library/jest-dom/vitest';

import userEvent from '@testing-library/user-event'

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

    const workflowVersion = {
        id: 'workflow-version-1',
        elements: [
            {
                id: 'element-1',
                type: 'start',
                position: { x: 100, y: 100 }
            },

            {
                id: 'if-element',
                type: 'if',
                name: 'If',
                position: { x: 200, y: 200 }
            },
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

    it.skip('Should render if element', () => {
        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
            />
        );

        screen.getByText('If');
    });

    it.skip('Should allow user to select an element', () => {
        const handleElementSelect = vi.fn();

        render(
            <WorkflowVersionEditorCanvas
                workflowVersion={workflowVersion}
                onElementSelect={handleElementSelect}
            />
        );

        const ifElement = screen.getByText('If');

        fireEvent.dblClick(ifElement);

        expect(handleElementSelect).toHaveBeenCalledWith(workflowVersion.elements[1]);
    });
});