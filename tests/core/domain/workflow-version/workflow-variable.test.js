import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';
import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';

describe('Workflow Variable', () => {
    describe('Type', () => {
        describe('When type is string', () => {
            describe('And string is passed as default value', () => {
                it('Should be created correctly', () => {
                    const variable = new WorkflowVariable({
                        id: '1',
                        name: 'Variable',
                        description: 'This is a variable',
                        type: 'string',
                        defaultValue: {
                            type: 'string',
                            string: 'abc',
                        },
                        markedAsInput: true,
                        markedAsOutput: true,
                    });

                    expect(variable).toEqual({
                        id: '1',
                        name: 'Variable',
                        description: 'This is a variable',
                        type: 'string',
                        defaultValue: new WorkflowStringValue('abc'),
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
                });
            });
        });
    });
});