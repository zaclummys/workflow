import { randomUUID } from 'crypto';

import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';
import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';
import WorkflowBooleanValue from '~/core/domain/workflow-version/values/workflow-boolean-value';

export class WorkflowExecution {
    static createOutput (output) {
        return new WorkflowExecutionOutput(output);
    }

    static create ({
        inputs,
        outputs,
        executedById,
        workflowVersionId,
    }) {
        return new WorkflowExecution({
            id: randomUUID(),
            inputs,
            outputs,
            executedById,
            workflowVersionId,
        });
    }

    constructor ({
        id,
        inputs,
        outputs,
        workflowVersionId,
        executedById,
    }) {
        if (!id) {
            throw new Error('id is required');
        }

        if (!inputs) {
            throw new Error('Inputs are required');
        }

        if (!outputs) {
            throw new Error('Outputs are required');
        }

        if (!workflowVersionId) {
            throw new Error('Workflow Version ID is required');
        }

        if (!executedById) {
            throw new Error('Executed By ID is required');
        }

        this.id = id;
        this.inputs = inputs;
        this.workflowVersionId = workflowVersionId;
        this.executedById = executedById;

        this.outputs = outputs.map(output => WorkflowExecution.createOutput(output));
    }

    getId () {
        return this.id;
    }

    getInputs () {
        return this.inputs;
    }

    getOutputs () {
        return this.outputs;
    }

    getWorkflowVersionId () {
        return this.workflowVersionId;
    }

    getExecutedById () {
        return this.executedById;
    }
}

export class WorkflowExecutionOutput {
    constructor ({ id, value }) {
        this.id = id;
        this.value = value;
    }

    getId () {
        return this.id;
    }

    getValue () {
        return this.value;
    }
}
