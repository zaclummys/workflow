import { User } from '~/core/domain/user';
import { Workspace } from '~/core/domain/workspace';
import { Workflow } from '~/core/domain/workflow';

import {
    WorkflowVersion,
    WorkflowStartElement,
    WorkflowIfElement,
    WorkflowAssignElement,
} from '~/core/domain/workflow-version';
import { expect } from 'chai';
import { describe } from 'vitest';

async function setup () {
    const user = await User.create({
        name: 'John Doe',
        email: 'johndoe@acme.org',
        password: '12345678',
    });

    const workspace = Workspace.create({
        name: 'Workspace 1',
        description: 'This is a very cool workspace.',
        createdById: user.getId(),
    });

    const workflow = Workflow.create({
        name: 'Workflow 1',
        description: 'This is a very cool workflow.',
        createdById: user.getId(),
        workspaceId: workspace.getId(),
    });

    const workflowVersion = WorkflowVersion.create({
        number: workflow.takeNextVersionNumber(),
        workflowId: workflow.getId(),
        createdById: user.getId(),
    });

    return {
        user,
        workflow,
        workflowVersion,
    }
}

describe('Workflow Version', async () => {
    it('Execute Workflow Version', async () => {
        const { workflowVersion } = await setup();

        const outputValues = workflowVersion.execute();

        expect(outputValues).toStrictEqual([]);
    });

    it('Create a workflow version correctly', async () => {
        const {
            user,
            workflow,
            workflowVersion,
        } = await setup();

        expect(workflowVersion).toStrictEqual(new WorkflowVersion({
            id: expect.any(String),
            status: 'draft',
            number: 1,
            workflowId: workflow.getId(),
            elements: [
                new WorkflowStartElement({
                    id: expect.any(String)
                }),
            ],
            variables: [],
            createdAt: expect.any(Date),
            createdById: user.getId(),
        }));
    });

    describe('Add element', () => {
        describe('Assign element', () => {
            it('Add after a start element', async () => {
                const { workflowVersion } = await setup();
    
                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign 1',
                    description: 'This is an assign element.',
                });
    
                const startElement = workflowVersion.getStartElement();
    
                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: startElement.getId(),
                });
    
                expect(workflowVersion.getElements()).toEqual(
                    expect.arrayContaining([
                        startElement,
                        assignElement,
                    ])
                );
    
                expect(startElement.getNextElementId()).toBe(assignElement.getId());
                expect(assignElement.getNextElementId()).toBeUndefined();
            });

            it('Add after an assign element', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();
    
                const firstAssignElement = WorkflowAssignElement.create({
                    name: 'Assign 1',
                    description: 'This is a assign element.',
                });
    
                const secondAssignElement = WorkflowAssignElement.create({
                    name: 'Assign 2',
                    description: 'This is another assign element.',
                });
    
                workflowVersion.addElement({
                    element: firstAssignElement,
                    previousElementId: startElement.getId(),
                });
    
                workflowVersion.addElement({
                    element: secondAssignElement,
                    previousElementId: firstAssignElement.getId(),
                });
    
                expect(startElement.getNextElementId()).toBe(firstAssignElement.getId());
                expect(firstAssignElement.getNextElementId()).toBe(secondAssignElement.getId());
                expect(secondAssignElement.getNextElementId()).toBeUndefined();
            });
    
            it('Add after an if element in true branch', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();
    
                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign',
                    description: 'This is an assign element.',
                });
    
                const ifElement = WorkflowIfElement.create({
                    name: 'If',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });
    
                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: startElement.getId(),
                });
    
                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: ifElement.getId(),
                    previousElementBranch: 'true',
                });
    
                expect(startElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBe(assignElement.getId());
                expect(ifElement.getNextElementIdIfFalse()).toBeUndefined();
                expect(assignElement.getNextElementId()).toBeUndefined();
            });
    
            it('Add after an if element in false branch', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();
    
                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign',
                    description: 'This is an assign element.',
                });
    
                const ifElement = WorkflowIfElement.create({
                    name: 'If',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });
    
                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: startElement.getId(),
                });
    
                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: ifElement.getId(),
                    previousElementBranch: 'false',
                });
    
                expect(startElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(ifElement.getNextElementIdIfFalse()).toBe(assignElement.getId());
                expect(assignElement.getNextElementId()).toBeUndefined();
            });
        });
        
        describe('If element', () => {
            it('Add after a start element', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();

                const ifElement = WorkflowIfElement.create({
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });
    
                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: startElement.getId(),
                });
    
                expect(workflowVersion.getElements()).toEqual(
                    expect.arrayContaining([
                        startElement,
                        ifElement,
                    ])
                );
    
                expect(startElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(ifElement.getNextElementIdIfFalse()).toBeUndefined();
            });
    
            it('Add after an assign element', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();
    
                const assignElement = WorkflowAssignElement.create({
                    name: 'Assign',
                    description: 'This is an assign element.',
                });
    
                const ifElement = WorkflowIfElement.create({
                    name: 'If',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });
    
                workflowVersion.addElement({
                    element: assignElement,
                    previousElementId: startElement.getId(),
                });
    
                workflowVersion.addElement({
                    element: ifElement,
                    previousElementId: assignElement.getId(),
                });
    
                expect(startElement.getNextElementId()).toBe(assignElement.getId());
                expect(assignElement.getNextElementId()).toBe(ifElement.getId());
                expect(ifElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(ifElement.getNextElementIdIfFalse()).toBeUndefined();
            });

            it('Add after an if element in true branch', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();
    
                const firstIfElement = WorkflowIfElement.create({
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                const secondIfElement = WorkflowIfElement.create({
                    name: 'If 2',
                    description: 'This is another if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: firstIfElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: secondIfElement,
                    previousElementId: firstIfElement.getId(),
                    previousElementBranch: 'true',
                });

                expect(startElement.getNextElementId()).toBe(firstIfElement.getId());

                expect(firstIfElement.getNextElementIdIfTrue()).toBe(secondIfElement.getId());
                expect(firstIfElement.getNextElementIdIfFalse()).toBeUndefined();

                expect(secondIfElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(secondIfElement.getNextElementIdIfFalse()).toBeUndefined();
            });
    
            it('Add after an if element in false branch', async () => {
                const { workflowVersion } = await setup();
    
                const startElement = workflowVersion.getStartElement();
    
                const firstIfElement = WorkflowIfElement.create({
                    name: 'If 1',
                    description: 'This is an if element.',
                    strategy: 'all',
                    conditions: [],
                });

                const secondIfElement = WorkflowIfElement.create({
                    name: 'If 2',
                    description: 'This is another if element.',
                    strategy: 'all',
                    conditions: [],
                });

                workflowVersion.addElement({
                    element: firstIfElement,
                    previousElementId: startElement.getId(),
                });

                workflowVersion.addElement({
                    element: secondIfElement,
                    previousElementId: firstIfElement.getId(),
                    previousElementBranch: 'false',
                });

                expect(startElement.getNextElementId()).toBe(firstIfElement.getId());
                
                expect(firstIfElement.getNextElementIdIfTrue()).toBeUndefined()
                expect(firstIfElement.getNextElementIdIfFalse()).toBe(secondIfElement.getId());

                expect(secondIfElement.getNextElementIdIfTrue()).toBeUndefined();
                expect(secondIfElement.getNextElementIdIfFalse()).toBeUndefined();
            });
        });
    
        it.fails('Cannot add start element', async () => {
            const { workflowVersion } = await setup();

            const startElement = workflowVersion.getStartElement();
    
            workflowVersion.addElement({
                previousElementId: startElement.getId(),                
                element: WorkflowStartElement.create(),
            });
        });
    });
});