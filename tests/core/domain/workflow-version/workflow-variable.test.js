import { WorkflowVariable } from '../../../../src/core/domain/workflow-version/workflow-variable';

describe('Workflow Variable', () => {
    describe('Type', () => {
        describe('When type is string', () => {
            describe('And string is passed as default value', () => {
                it('Should not throw an error', () => {
                    new WorkflowVariable({
                        id: '1',
                        name: 'Variable',
                        type: 'string',
                        hasDefaultValue: true,
                        defaultValue: 'Value',
                        markedAsInput: true,
                        markedAsOutput: true,
                    });
                });
            });
            
            describe('And number is passed as default value', () => {
                it('Should throw an error', () => {
                    expect(() => {
                        new WorkflowVariable({
                            id: '1',
                            name: 'Variable',
                            type: 'string',
                            hasDefaultValue: true,
                            defaultValue: 1,
                            markedAsInput: true,
                            markedAsOutput: true,
                        });
                    }).toThrowError('Default value must be a string, got number.');
                });
            });

            describe('And boolean is passed as default value', () => {
                it('Should throw an error', () => {
                    expect(() => {
                        new WorkflowVariable({
                            id: '1',
                            name: 'Variable',
                            type: 'string',
                            hasDefaultValue: true,
                            defaultValue: true,
                            markedAsInput: true,
                            markedAsOutput: true,
                        });
                    }).toThrowError('Default value must be a string, got boolean.');
                });
            });
        });
    });
});