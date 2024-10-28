import { randomUUID } from 'crypto';

import {
    WorkflowExecutionContext,
    WorkflowExecutionOutput,
    WorkflowExecutionVariable,
} from './workflow-execution';

import { WorkflowStartElement } from '~/core/domain/workflow-version/workflow-start-element';

import {
    WorkflowAssignElement,
    WorkflowSetAssignment,
    WorkflowAddAssignment,
    WorkflowSubtractAssignment,
    WorkflowMultiplyAssignment,
    WorkflowDivideAssignment,
} from './workflow-version/workflow-assign-element';

import { WorkflowIfElement } from '~/core/domain/workflow-version/workflow-if-element';

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
                    return new WorkflowAssignElement({
                        ...elementData,
                        assignments: elementData.assignments.map(assignmentData => {
                            switch (assignmentData.type) {
                                case 'set':
                                    return new WorkflowSetAssignment(assignmentData);

                                case 'add':
                                    return new WorkflowAddAssignment(assignmentData);

                                case 'subtract':
                                    return new WorkflowSubtractAssignment(assignmentData);

                                case 'multiply':
                                    return new WorkflowMultiplyAssignment(assignmentData);

                                case 'divide':
                                    return new WorkflowDivideAssignment(assignmentData);

                                default:
                                    throw new Error(`Unexpected assignment type: ${assignmentData.type}`);
                            }
                        }),
                    });

                case 'if':
                    return new WorkflowIfElement({
                        ...elementData,
                        conditions: elementData.conditions.map(conditionData => new WorkflowCondition(conditionData)),
                    });

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

        return this.variables.map(variable => {
            if (!variable.getMarkedAsInput()) {
                return new WorkflowExecutionVariable({
                    variableId: variable.getId(),
                    value: variable.getDefaultValue(),
                });
            }

            const input = inputs.find(input => input.variableId === variable.getId());
                
            if (input) {
                return new WorkflowExecutionVariable({
                    variableId: input.variableId,
                    value: input.value,
                });
            } 

            if (!variable.getHasDefaultValue()) {
                throw new Error(`Variable '${variable.name}' does not have a default value and an input was not provided.`);
            }

            return new WorkflowExecutionVariable({
                variableId: variable.getId(),
                value: variable.getDefaultValue(),
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

export class WorkflowVariable {
    constructor({
        id,
        name,
        type,
        description,
        hasDefaultValue,
        defaultValue,
        markedAsInput,
        markedAsOutput,
    }) {
        const validTypes = ['number', 'string', 'boolean'];

        if (!id) {
            throw new Error('ID is required.');
        }

        if (!name) {
            throw new Error('Name is required.');
        }

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!validTypes.includes(type)) {
            throw new Error(`Type must be one of ${validTypes.join(', ')}, got ${type}.`);
        }

        if (typeof hasDefaultValue !== 'boolean') {
            throw new Error('Has default value option must be a boolean, received: ' + typeof hasDefaultValue);
        }

        if (defaultValue === undefined) {
            throw new Error('Default value cannot be undefined.');
        }

        if (!hasDefaultValue && defaultValue != null) {
            throw new Error('Default value is not allowed.');
        }

        if (hasDefaultValue && defaultValue == null) {
            throw new Error('Default value is required.');
        }

        if (typeof markedAsInput !== 'boolean') {
            throw new Error('Marked as input option must be a boolean.');
        }

        if (typeof markedAsOutput !== 'boolean') {
            throw new Error('Marked as output option must be a boolean.');
        }

        if (!markedAsInput && !hasDefaultValue) {
            throw new Error('If a variable is not marked as input, it must have a default value.');
        }

        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.hasDefaultValue = hasDefaultValue;
        this.defaultValue = defaultValue;
        this.markedAsInput = markedAsInput;
        this.markedAsOutput = markedAsOutput;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getDescription() {
        return this.description;
    }

    getHasDefaultValue() {
        return this.hasDefaultValue;
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    getMarkedAsInput() {
        return this.markedAsInput;
    }

    getMarkedAsOutput() {
        return this.markedAsOutput;
    }
}

