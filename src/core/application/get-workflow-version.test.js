import { fromWorkflowIfElement } from '~/core/application/get-workflow-version';
import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';

describe('Get Workflow Version', () => {
    describe('From Workflow If Element', () => {
        it('Should convert', () => {
            const output = fromWorkflowIfElement(new WorkflowIfElement({
                id: '1',
                name: 'Name',
                description: 'Description',
                strategy: 'all',
                conditions: [],
                nextElementIdIfTrue: '2',
                nextElementIdIfFalse: '3',
                positionX: 1,
                positionY: 2,
            }));

            expect(output).toEqual({
                id: '1',
                type: 'if',
                name: 'Name',
                description: 'Description',
                conditions: [],
                strategy: 'all',
                nextElementIdIfTrue: '2',
                nextElementIdIfFalse: '3',
                positionX: 1,
                positionY: 2,
            });
        });
    });
});