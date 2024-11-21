import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';

describe('Workflow Variable', () => {
    describe('Number', () => {
        it('Should create a number variable', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'number',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: 10,
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'number',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: 10,
            });
        });
    });

    describe('String', () => {
        it('Should create a string variable', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'string',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: 'test',
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'string',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: 'test',
            });
        });
    });

    describe('Boolean', () => {
        it('Should create a boolean variable', () => {
            const variable = new WorkflowVariable({
                id: '123',
                name: 'test',
                type: 'boolean',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: true,
            });

            expect(variable).toMatchObject({
                id: '123',
                name: 'test',
                type: 'boolean',
                markedAsInput: true,
                markedAsOutput: false,
                defaultValue: true,
            });
        });
    });
});