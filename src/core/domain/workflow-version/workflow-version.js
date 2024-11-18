import { randomUUID } from 'crypto';

import WorkflowStartElement from '~/core/domain/workflow-version/elements/start/workflow-start-element';

import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';
import WorkflowCondition from '~/core/domain/workflow-version/elements/if/workflow-condition';

import WorkflowAssignElement from '~/core/domain/workflow-version/elements/assign/workflow-assign-element';
import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';

import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';

import {
    WorkflowExecution,
    WorkflowExecutionOutput,
} from '~/core/domain/workflow-execution/workflow-execution';

export {
    WorkflowStartElement,
    WorkflowVariable,
    WorkflowIfElement,
    WorkflowCondition,
    WorkflowAssignElement,
    WorkflowAssignment,
    WorkflowExecution,
    WorkflowExecutionOutput,
};

export class WorkflowVersion {
    static createVariable (variableData) {
        return new WorkflowVariable(variableData);
    }

    static createElement (elementData) {
        switch (elementData.type) {
            case 'start':
                return new WorkflowStartElement(elementData);

            case 'assign':
                return new WorkflowAssignElement(elementData);

            case 'if':
                return new WorkflowIfElement(elementData);

            default:
                throw new Error(`Unexpected element type: ${elementData.type}`);
        }
    }

    static create({
        number,
        workflowId,
        createdById,
    }) {
        return new WorkflowVersion({
            id: randomUUID(),
            number,
            workflowId,
            createdById,
            status: 'draft',
            variables: [],
            elements: [
                {
                    id: randomUUID(),
                    type: 'start',
                    positionX: 0.0,
                    positionY: 0.0,
                },
            ],
            createdAt: new Date(),
        });
    }

    constructor({
        id,
        number,
        status,
        variables,
        elements,
        workflowId,
        createdAt,
        createdById,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!number) {
            throw new Error('Number is required.');
        }

        if (!status) {
            throw new Error('Status is required.');
        }

        if (!variables) {
            throw new Error('Variables are required.');
        }

        if (!elements) {
            throw new Error('Elements are required.');
        }

        if (!workflowId) {
            throw new Error('Workflow ID is required.');
        }

        if (!createdAt) {
            throw new Error('Created at is required.');
        }

        if (!createdById) {
            throw new Error('Created by ID is required.');
        }

        this.id = id;
        this.number = number;
        this.status = status;
        this.workflowId = workflowId;
        this.createdAt = createdAt;
        this.createdById = createdById;

        this.variables = variables.map(variableData => WorkflowVersion.createVariable(variableData));
        this.elements = elements.map(elementData => WorkflowVersion.createElement(elementData));
    }

    getId() {
        return this.id;
    }

    getNumber() {
        return this.number;
    }

    getStatus() {
        return this.status;
    }

    getVariables() {
        return this.variables;
    }

    getElements() {
        return this.elements;
    }

    getConnections () {
        return this.connections;
    }

    getWorkflowId() {
        return this.workflowId;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getCreatedById() {
        return this.createdById;
    }

    isDraft () {
        return this.status === 'draft';
    }

    change ({
        variables = [],
        elements = [],
    }) {
        this.variables = variables.map(variableData => WorkflowVersion.createVariable(variableData));
        this.elements = elements.map(elementData => WorkflowVersion.createElement(elementData));
    }

    changeAsNewVersion ({
        nextWorkflowVersionNumber,
        workflowVersionChanges,
    }) {
        const newWorkflow = WorkflowVersion.create({
            number: nextWorkflowVersionNumber,
            workflowId: this.workflowId,
            createdById: this.createdById,
        });

        newWorkflow.change(workflowVersionChanges);

        return newWorkflow;
    }

    activate() {
        this.status = 'active';
    }

    deactivate() {
        this.status = 'inactive';
    }

    getStartElement() {
        return this.elements.find(element => element instanceof WorkflowStartElement);
    }

    findElementById(elementId) {
        return this.elements.find(element => elementId === element.getId());
    }

    findVariableById(variableId) {
        return this.variables.find(variable => variableId === variable.getId());
    }

    execute ({
        inputs,
        userId,
    }) {
        if (inputs == null) {
            throw new Error('Inputs cannot be null.');
        }

        if (userId == null) {
            throw new Error('User ID cannot be null.');
        }

        if (this.status !== 'active') {
            throw new Error('Cannot execute a workflow version that is not active');
        }

        const context = new WorkflowExecutionContext({
            variables: this.variables.map(variable => {
                const defaultValue = variable.getDefaultValue();

                switch (variable.getType()) {
                    case 'number':
                        return {
                            id: variable.getId(),
                            type: 'number',
                            value: defaultValue.getNumber(),
                            markedAsOutput: variable.getMarkedAsOutput(),
                        };

                    case 'string':
                        return {
                            id: variable.getId(),
                            type: 'string',
                            value: defaultValue.getString(),
                            markedAsOutput: variable.getMarkedAsOutput(),
                        };

                    case 'boolean':
                        return {
                            id: variable.getId(),
                            type: 'boolean',
                            value: defaultValue.getBoolean(),
                            markedAsOutput: variable.getMarkedAsOutput(),
                        };

                    default:
                        throw new Error(`Unknown variable type: ${variable.getType()}`);
                }
            }),
        });

        const startElement = this.getStartElement();

        if (startElement == null) {
            throw new Error('Workflow version does not have a start element.');
        }

        let currentElement = startElement;

        while (true) {
            const nextElementId = currentElement.execute(context);

            if (nextElementId == null) {
                break;
            }

            const nextElement = this.findElementById(nextElementId);

            currentElement = nextElement;
        }

        return WorkflowExecution.create({
            inputs,
            outputs: context.getOutputVariables(),
            executedById: userId,
            workflowVersionId: this.id,
        });
    }
}

export class WorkflowExecutionContext {
    constructor ({ variables }) { 
        this.variables = variables.map(variable => new WorkflowVersionRuntimeVariable(variable));
    }

    findVariableById (variableId) {
        const variable = this.variables.find(variable => variableId === variable.getId());

        if (variable == null) {
            throw new Error(`Variable ${variableId} not found.`);
        }

        return variable;
    }

    getOutputVariables () {
        return this.variables
            .filter(variable => variable.getMarkedAsOutput())
            .map(variable => ({
                id: variable.getId(),
                type: variable.getType(),
                value: variable.getValue(),
            }));
    }
}

export class WorkflowVersionRuntimeString {
    constructor (string) {
        if (string == null) {
            throw new Error('String cannot be null.');
        }

        if (typeof string !== 'string') {
            throw new Error('String must be a string. Received ' + typeof string + '.');
        }

        this.string = string;
    }

    equalTo (other) {
        return this.string === other.string;
    }
}

export class WorkflowVersionRuntimeBoolean {
    constructor (boolean) {
        if (boolean == null) {
            throw new Error('Boolean cannot be null.');
        }

        if (typeof boolean !== 'boolean') {
            throw new Error('Boolean must be a boolean. Received ' + typeof boolean + '.');
        }

        this.boolean = boolean;
    }

    equalTo (other) {
        return this.boolean === other.boolean;
    }
}

export class WorkflowVersionRuntimeNumber {
    constructor (number) {
        if (number == null) {
            throw new Error('Number cannot be null.');
        }

        if (typeof number !== 'number') {
            throw new Error('Number must be a number. Received ' + typeof number + '.');
        }

        this.number = number;
    }

    equalTo (other) {
        return this.number === other.number;
    }

    increment (other) {
        this.number += other.number;
    }

    decrement (other) {
        this.number -= other.number;
    }
}

export class WorkflowVersionRuntimeVariable {
    constructor ({
        id,
        type,
        value,
        markedAsOutput,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!type) {
            throw new Error('Type is required.');
        }

        if (value == null) {
            throw new Error('Value cannot be null.');
        }

        if (markedAsOutput == null) {
            throw new Error('Marked as output cannot be null.');
        }

        this.id = id;
        this.type = type;
        this.markedAsOutput = markedAsOutput;

        switch (type) {
            case 'number':
                this.value = new WorkflowVersionRuntimeNumber(value);
            break;

            case 'string':
                this.value = new WorkflowVersionRuntimeString(value);
            break;

            case 'boolean':
                this.value = new WorkflowVersionRuntimeBoolean(value);
            break;

            default:
                throw new Error(`Unknown variable type: ${type}`);
        }
    }

    getId () {
        return this.id;
    }

    getType () {
        return this.type;
    }

    getMarkedAsOutput () {
        return this.markedAsOutput;
    }

    set (value) {
        this.value = value;
    }

    increment (other) {
        this.value.increment(other);
    }

    decrement (value) {
        this.value.decrement(value);
    }

    equalTo (value) {
        return this.value.equalTo(value);
    }

    greaterThan (value) {
        return this.value.greaterThan(value);
    }

    lessThan (value) {
        return this.value.lessThan(value);
    }

    getValue () {
        switch (this.type) {
            case 'number':
                return {
                    type: 'number',
                    number: this.value.number,
                };

            case 'string':
                return {
                    type: 'string',
                    string: this.value.string,
                };

            case 'boolean':
                return {
                    type: 'boolean',
                    boolean: this.value.boolean,
                }

            default:
                throw new Error(`Unknown variable type: ${this.variable.getType()}`);
        }
    }
}