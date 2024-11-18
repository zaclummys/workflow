import WorkflowBooleanValue from '~/core/domain/workflow-version/values/workflow-boolean-value';
import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';
import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';

import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';

describe('Workflow Variable', () => {
    describe('Number', () => {
        it('Should create a number variable without default value', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'number',
                defaultValue: null,
                markedAsInput: true,
                markedAsOutput: false,
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'number',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: null,
            });
        });

        it('Should create a number variable with default value', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'number',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: {
                    type: 'number',
                    number: 10,
                },
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'number',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: new WorkflowNumberValue(10),
            });
        });
    });

    describe('String', () => {
        it('Should create a string variable without default value', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'string',
                defaultValue: null,
                markedAsInput: true,
                markedAsOutput: false,
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'string',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: null,
            });
        });

        it('Should create a string variable with default value', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'string',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: {
                    type: 'string',
                    string: 'test',
                },
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'string',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: new WorkflowStringValue('test'),
            });
        });
    });

    describe('Boolean', () => {
        it('Should create a boolean variable without default value', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'boolean',
                defaultValue: null,
                markedAsInput: true,
                markedAsOutput: false,
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'boolean',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: null,
            });
        });

        it('Should create a boolean variable with default value', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'boolean',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: {
                    type: 'boolean',
                    boolean: true,
                },
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'boolean',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: new WorkflowBooleanValue(true),
            });
        });
    });
});