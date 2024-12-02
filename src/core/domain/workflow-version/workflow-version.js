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

import WorkflowVersionRuntimeContext from './runtime/workflow-version-runtime-context';

export {
    WorkflowStartElement,
    WorkflowVariable,
    WorkflowIfElement,
    WorkflowCondition,
    WorkflowAssignElement,
    WorkflowAssignment,
    WorkflowExecution,
    WorkflowVersionRuntimeContext,
    WorkflowExecutionOutput,
};

export class WorkflowVersion {
    static ensureThatEveryElementIsConnected (elements) {
        const elementIds = elements.map(element => element.id);

        const connections = [];
        
        for (const element of elements) {
            switch (element.type) {
                case 'start':
                    if (element.nextElementId != null) {
                        connections.push(element.nextElementId);
                    }
                break;

                case 'assign':
                    if (element.nextElementId != null) {
                        connections.push(element.nextElementId);
                    }
                break;

                case 'if':
                    if (element.nextElementIdIfTrue != null) {
                        connections.push(element.nextElementIdIfTrue);
                    }

                    if (element.nextElementIdIfFalse != null) {
                        connections.push(element.nextElementIdIfFalse);
                    }
                break;
            }
        }

        for (const connection of connections) {
            if (!elementIds.includes(connection)) {
                throw new Error(`Element '${connection}' does not exist.`);
            }
        }

        for (const element of elements) {
            if (element.type === 'start') {
                continue;
            }

            const isConnected = connections.includes(element.id);

            if (!isConnected) {
                throw new Error(`Element '${element.name}' is not connected.`);
            }
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
                },
            ],
            createdAt: new Date(),
        });
    }

    constructor({
        id,
        number,
        status,
        variables = [],
        elements = [],
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

        this.elements = [];
        this.variables = [];

        this.updateVariables(variables);
        this.updateElements(elements);
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

    updateVariables (variables) {
        this.variables = variables.map(variableData => new WorkflowVariable(variableData));
    }

    updateElements (elements) {
        WorkflowVersion.ensureThatEveryElementIsConnected(elements);

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

    change ({
        variables = [],
        elements = [],
    }) {
        if (this.status !== 'draft') {
            throw new Error('Cannot change a workflow version that is not in draft.');
        }

        this.updateVariables(variables);
        this.updateElements(elements);
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

        const findVariableById = id => {
            return this.variables.find(variable => id === variable.getId());
        }

        const findInputById = id => {
            return inputs.find(input => input.id === id);
        };

        const getInitialValueById = id => {
            const variable = findVariableById(id);

            if (variable.getMarkedAsInput()) {
                const input = findInputById(id);

                if (input != null) {
                    return input.value;
                }
            } 

            return variable.getDefaultValue();
        }

        inputs.forEach(input => {
            if (input == null) {
                throw new Error('Input cannot be null');
            }

            if (input.id == null) {
                throw new Error('Input Id cannot be null')
            }

            if (input.value == null) {
                throw new Error('Input value cannot be null');
            }

            const variable = findVariableById(input.id);

            if (!variable.getMarkedAsInput()) {
                throw new Error('Input value cannot be set because variable is not marked as input');
            }
        });
        
        const variables = this.variables.map(variable => {
            const initialValue = getInitialValueById(variable.getId());

            return {
                value: initialValue,
                id: variable.getId(),
                type: variable.getType(),
                markedAsOutput: variable.getMarkedAsOutput(),
            };
        });

        const context = new WorkflowVersionRuntimeContext({
            variables,
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