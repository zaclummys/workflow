import { randomUUID } from 'crypto';

import {
    WorkflowExecutionContext,
    WorkflowExecutionOutput,
} from '~/core/domain/workflow-execution.js';

import WorkflowExecutionVariable from '~/core/domain/workflow-execution/workflow-execution-variable';

import WorkflowStartElement from '~/core/domain/workflow-version/elements/start/workflow-start-element';

import WorkflowIfElement from '~/core/domain/workflow-version/elements/if/workflow-if-element';
import WorkflowCondition from '~/core/domain/workflow-version/elements/if/workflow-condition';

import WorkflowAssignElement from '~/core/domain/workflow-version/elements/assign/workflow-assign-element';
import WorkflowAssignment from '~/core/domain/workflow-version/elements/assign/workflow-assignment';

import WorkflowVariable from '~/core/domain/workflow-version/workflow-variable';

export class WorkflowVersion {
    static create({
        number,
        workflowId,
        createdById,
    }) {
        const startElement = new WorkflowStartElement({
            id: randomUUID(),
            positionX: 0.0,
            positionY: 0.0,
        });

        return new WorkflowVersion({
            number,
            workflowId,
            createdById,
            id: randomUUID(),
            status: 'draft',
            variables: [],
            elements: [
                startElement,
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
        this.variables = variables;
        this.elements = elements;
        this.workflowId = workflowId;
        this.createdAt = createdAt;
        this.createdById = createdById;
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

    change ({ variables, elements }) {
        this.variables = variables.map(variableData => new WorkflowVariable(variableData));
        this.elements = elements.map(elementData => {
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
        });
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

    fillExecutionVariables (inputs) {
        inputs.forEach(input => {
            if (input.variableId == null) {
                throw new Error('Input Variable ID cannot be null.');
            }

            if (input.value == null) {
                throw new Error(`Input value cannot be null.`);
            }

            const variable = this.variables.find(variable => input.variableId === variable.getId());

            if (!variable) {
                throw new Error(`Variable '${input.variableId}' does not exist.`);
            }

            if (!variable.getMarkedAsInput()) {
                throw new Error(`Variable '${variable.getName()}' is not marked as input.`);
            }

            const inputType = typeof input.value;
            const variableType = variable.getType();

            if (inputType !== variableType) {
                throw new Error(`Input value for variable '${variable.getName()}' must be a ${variable.getType()}, got ${inputType}.`);
            }
        });

        const getValue = (variable) => {
            if (!variable.getMarkedAsInput()) {
                return variable.getDefaultValue();
            }

            const input = inputs.find(input => input.variableId === variable.getId());
                
            if (input) {
                return input.value;
            } 

            if (!variable.getHasDefaultValue()) {
                throw new Error(`Variable '${variable.name}' does not have a default value and an input was not provided.`);
            }

            return variable.getDefaultValue();
        }

        return this.variables.map(variable => {
            return new WorkflowExecutionVariable({
                variableId: variable.getId(),
                value: getValue(variable),
            });
        });
    }

    async execute ({
        inputs,
    }) {
        if (inputs == null) {
            throw new Error('Inputs cannot be null.');
        }

        if (this.status !== 'active') {
            throw new Error('Cannot execute a workflow version that is not active');
        }

        const executionVariables = this.fillExecutionVariables(inputs);

        const context = new WorkflowExecutionContext(executionVariables);

        let currentElement = this.getStartElement();

        const elementIdHistory = []; 

        while (true) {
            elementIdHistory.push(currentElement.getId());

            const nextElementId = currentElement.execute(context);

            if (!nextElementId) {
                break;
            }

            currentElement = this.findElementById(nextElementId);

            if (!currentElement) {
                throw new Error(`Element with ID ${nextElementId} not found.`);
            }
        }

        const outputExecutionVariables = this.variables
            .filter(variable => variable.getMarkedAsOutput())
            .map(variable => {
                const executionVariable = context.findVariableById(variable.getId());

                return new WorkflowExecutionOutput({
                    variableId: executionVariable.getVariableId(),
                    value: executionVariable.getValue(),
                });
            });

        return {
            history: elementIdHistory,
            outputs: outputExecutionVariables,
        };
    }
}


