import { randomUUID } from 'crypto';

export class WorkflowExecution {
    static create ({
        inputValues,
        workflowVersionId,
        executedById,
    }) {
        return new WorkflowExecution({
            id: randomUUID(),
            status: 'pending',
            inputValues,
            outputValues: [],
            startedAt: null,
            finishedAt: null,
            executedById,
            workflowVersionId,
        });
    }

    constructor ({
        id,
        status,
        inputValues,
        outputValues,
        workflowVersionId,
        startedAt,
        finishedAt,
        executedById,
    }) {
        if (!id) {
            throw new Error('id is required');
        }

        if (!status) {
            throw new Error('status is required');
        }

        if (!workflowVersionId) {
            throw new Error('Workflow Version ID is required');
        }

        if (!executedById) {
            throw new Error('Executed By ID is required');
        }

        this.id = id;
        this.status = status;
        this.inputValues = inputValues;
        this.outputValues = outputValues;
        this.workflowVersionId = workflowVersionId;
        this.startedAt = startedAt;
        this.finishedAt = finishedAt;
        this.executedById = executedById;
    }

    getId () {
        return this.id;
    }

    getStatus () {
        return this.status;
    }

    getInputValues () {
        return this.inputValues;
    }

    getOutputValues () {
        return this.outputValues;
    }

    getStartedAt () {
        return this.startedAt;
    }

    getFinishedAt () {
        return this.finishedAt;
    }

    getWorkflowVersionId () {
        return this.workflowVersionId;
    }

    getExecutedById () {
        return this.executedById;
    }

    setStatus (status) {
        this.status = status;
    }

    setStartedAt (startedAt) {
        this.startedAt = startedAt;
    }

    setFinishedAt (finishedAt) {
        this.finishedAt = finishedAt;
    }
}

export class WorkflowExecutionInputValue {
    static create ({
        variableId,
        value,
    }) {
        return new WorkflowExecutionInputValue({
            variableId,
            value,
        });
    }

    constructor ({
        variableId,
        value,
    }) {
        if (!variableId) {
            throw new Error('Variable ID is required');
        }

        this.variableId = variableId;
        this.value = value;
    }

    getVariableId () {
        return this.variableId;
    }

    getValue () {
        return this.value;
    }
}

export class WorkflowExecutionOutputValue {
    static create ({
        variableId,
        value,
    }) {
        return new WorkflowExecutionOutputValue({
            variableId,
            value,
        });
    }

    constructor ({
        variableId,
        value,
    }) {
        if (!variableId) {
            throw new Error('Variable ID is required');
        }

        this.variableId = variableId;
        this.value = value;
    }

    getVariableId () {
        return this.variableId;
    }

    getValue () {
        return this.value;
    }
}