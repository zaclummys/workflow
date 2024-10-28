import { randomUUID } from 'crypto';

export class WorkflowExecution {
    static create ({
        inputValues = [],
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

        if (!inputValues) {
            throw new Error('Input Values is required');
        }

        if (!outputValues) {
            throw new Error('Output Values is required');
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

    start () {
        this.status = 'running';
        this.startedAt = new Date();
    }

    finishWithSuccess () {
        this.status = 'success';
        this.finishedAt = new Date();
    }

    finishWithError () {
        this.status = 'error';
        this.finishedAt = new Date();
    }
}

export class WorkflowExecutionContext {
    constructor (variables) {
        this.variables = variables;
    }

    findVariableById (variableId) {
        const variable = this.variables.find(variable => variableId === variable.getVariableId());

        if (!variable) {
            throw new Error(`Variable with ID ${variableId} not found.`);
        }

        return variable;
    }

    fillVariables (inputs) {
        this.variables
            .filter(variable => variable.isMarkedAsInput())
            .forEach(variable => {
                console.log(variable.constructor.name);
                const input = inputs.find(input => input.variableId === variable.getVariableId());

                if (!input) {
                    throw new Error(`Input for variable ${variable.variableId} not found.`);
                }

                variable.set(input.value);
            });
    }

    extractVariables () {
        return this.variables
            .filter(variable => variable.isMarkedAsOutput())
            .map(variable => {
                return new WorkflowExecutionOutput({
                    variableId: variable.getVariableId(),
                    value: variable.getValue(),
                });
            });
    }
}

export class WorkflowExecutionInput {
    constructor ({
        variableId,
        value,
    }) {
        if (!variableId) {
            throw new Error('Variable ID is required');
        }

        if (value == null) {
            throw new Error('Value cannot be null');
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

export class WorkflowExecutionOutput {
    constructor ({
        variableId,
        value,
    }) {
        if (!variableId) {
            throw new Error('Variable ID is required');
        }

        if (value == null) {
            throw new Error('Value cannot be null');
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

export class WorkflowExecutionVariable {
    constructor ({
        variableId, 
        // markedAsInput,
        // markedAsOutput,
        value,
     }) {
        if (!variableId) {
            throw new Error('Variable ID is required');
        }

        if (value == null) {
            throw new Error('Value cannot be null');
        }

        this.variableId = variableId;
        // this.markedAsInput = markedAsInput;
        // this.markedAsOutput = markedAsOutput;
        this.value = value;
    }

    // isMarkedAsInput () {
    //     return this.markedAsInput;
    // }

    // isMarkedAsOutput () {
    //     return this.markedAsOutput;
    // }

    getVariableId () {
        return this.variableId;
    }

    getValue () {
        return this.value;
    }

    equalTo (value) {
        return this.value === value;
    }

    differentThan (value) {
        return this.value !== value;
    }

    greaterThan (value) {
        return this.value > value;
    }

    lessThan (value) {
        return this.value < value;
    }

    set (value) {
        this.value = value;
    }

    add (value) {
        this.value += value;
    }

    subtract (value) {
        this.value -= value;
    }

    multiply (value) {
        this.value *= value;
    }

    divide (value) {
        this.value /= value;
    }
}