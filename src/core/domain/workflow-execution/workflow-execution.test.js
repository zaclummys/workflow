import { WorkflowExecution, WorkflowExecutionOutput } from './workflow-execution';

describe('Workflow Execution', () => {
    it('Should create a workflow execution', () => {
        const workflowExecution = WorkflowExecution.create({
            inputs: [],
            outputs: [],
            executedById: 'user-1',
            workflowVersionId: 'workflow-version-1',
        });

        expect(workflowExecution.getId()).toBeDefined();
        expect(workflowExecution.getInputs()).toEqual([]);
        expect(workflowExecution.getOutputs()).toEqual([]);
        expect(workflowExecution.getExecutedById()).toBe('user-1');
        expect(workflowExecution.getWorkflowVersionId()).toBe('workflow-version-1');
    });

    it('Should instantiate a workflow execution', () => {
        const workflowExecution = new WorkflowExecution({
            id: 'workflow-execution-1',
            inputs: [],
            outputs: [],
            executedById: 'user-1',
            workflowVersionId: 'workflow-version-1',
        });

        expect(workflowExecution.getId()).toBe('workflow-execution-1');
        expect(workflowExecution.getInputs()).toEqual([]);
        expect(workflowExecution.getOutputs()).toEqual([]);
        expect(workflowExecution.getExecutedById()).toBe('user-1');
        expect(workflowExecution.getWorkflowVersionId()).toBe('workflow-version-1');
    });

    it('SHould instance a workflow execution with outputs', () => {
        const workflowExecution = new WorkflowExecution({
            id: 'workflow-execution-1',
            inputs: [],
            outputs: [
                {
                    id: 'variable-1',
                    value: 10,
                },
            ],
            executedById: 'user-1',
            workflowVersionId: 'workflow-version-1',
        });

        expect(workflowExecution.getOutputs()).toEqual([
            new WorkflowExecutionOutput({
                id: 'variable-1',
                value: 10,
            }),
        ]);
    });

    describe('Workflow Execution Output', () => {
        it('Should create a string workflow execution output', () => {
            const output = new WorkflowExecutionOutput({
                id: 'variable-1',
                value: 'abc',
            });

            expect(output.getId()).toBe('variable-1');
            expect(output.getValue()).toEqual('abc');
        });

        it('Should create a number workflow execution output', () => {
            const output = new WorkflowExecutionOutput({
                id: 'variable-1',
                value: 10,
            });

            expect(output.getId()).toBe('variable-1');
            expect(output.getValue()).toEqual(10);
        });

        it('Should create a boolean workflow execution output', () => {
            const output = new WorkflowExecutionOutput({
                id: 'variable-1',
                value: true,
            });

            expect(output.getId()).toBe('variable-1');
            expect(output.getValue()).toEqual(true);
        });
    });
});