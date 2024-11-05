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
                        hasDefaultValue: true,
                        defaultValue: 'abc',
                        markedAsInput: true,
                        markedAsOutput: true,
                    });

                    expect(variable).toStrictEqual(new WorkflowVariable({
                        id: '1',
                        name: 'Variable',
                        description: 'This is a variable',
                        type: 'string',
                        hasDefaultValue: true,
                        defaultValue: 'abc',
                        markedAsInput: true,
                        markedAsOutput: true,
                    }));
                });
            });
        });
    });
});