import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';
import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';
import WorkflowBooleanValue from '~/core/domain/workflow-version/values/workflow-boolean-value';

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
                    variableId: 'variable-1',
                    value: {
                        type: 'number',
                        number: 10,
                    }
                },
            ],
            executedById: 'user-1',
            workflowVersionId: 'workflow-version-1',
        });

        expect(workflowExecution.getOutputs()).toEqual([
            new WorkflowExecutionOutput({
                variableId: 'variable-1',
                value: {
                    type: 'number',
                    number: 10,
                }
            }),
        ]);
    });

    describe('Workflow Execution Output', () => {
        it('Should create a string workflow execution output', () => {
            const output = new WorkflowExecutionOutput({
                variableId: 'variable-1',
                value: {
                    type: 'string',
                    string: 'abc',
                },
            });

            expect(output.getVariableId()).toBe('variable-1');
            expect(output.getValue()).toEqual(new WorkflowStringValue('abc'));
        });

        it('Should create a number workflow execution output', () => {
            const output = new WorkflowExecutionOutput({
                variableId: 'variable-1',
                value: {
                    type: 'number',
                    number: 10,
                },
            });

            expect(output.getVariableId()).toBe('variable-1');
            expect(output.getValue()).toEqual(new WorkflowNumberValue(10));
        });

        it('Should create a boolean workflow execution output', () => {
            const output = new WorkflowExecutionOutput({
                variableId: 'variable-1',
                value: {
                    type: 'boolean',
                    boolean: true,
                },
            });

            expect(output.getVariableId()).toBe('variable-1');
            expect(output.getValue()).toEqual(new WorkflowBooleanValue(true));
        });
    });
});