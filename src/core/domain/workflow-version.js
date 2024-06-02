import { randomUUID } from 'crypto';

export class WorkflowVersion {
    static create ({
        number,
        workflowId,
        createdById,
    }) {
        return new WorkflowVersion({
            number,
            workflowId,
            createdById,
            id: randomUUID(),
            status: 'draft',
            variables: [
                WorkflowVariable.create({
                    name: 'x (1)',
                    type: 'number',
                    description: 'This is an input variable.',
                    defaultValue: 1,
                    markedAsInputOption: true,
                    markedAsOutputOption: false,
                }),

                WorkflowVariable.create({
                    name: 'y (abc)',
                    type: 'string',
                    description: 'This is another input variable.',
                    defaultValue: 'abc',
                    markedAsInputOption: true,
                    markedAsOutputOption: false,
                }),

                WorkflowVariable.create({
                    name: 'z (true)',
                    type: 'boolean',
                    description: 'Guess what? An input variable.',
                    defaultValue: true,
                    markedAsInputOption: true,
                    markedAsOutputOption: false,
                }),

                WorkflowVariable.create({
                    name: 'output',
                    type: 'number',
                    description: 'This is an output variable.',
                    defaultValue: 0,
                    markedAsInputOption: false,
                    markedAsOutputOption: true,
                }),
            ],
            elements: [
                WorkflowStartElement.create(),
                WorkflowEndElement.create(),
            ],
            createdAt: new Date(),
        });
    }

    constructor ({
        id,
        number,
        status,
        variables,
        elements,
        workflowId,
        forkedFromId,
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
        this.forkedFromId = forkedFromId;
        this.createdAt = createdAt;
        this.createdById = createdById;
    }

    getId () {
        return this.id;
    }

    getNumber () {
        return this.number;
    }

    getStatus () {
        return this.status;
    }

    getVariables () {
        return this.variables;
    }

    getElements () {
        return this.elements;
    }

    getWorkflowId () {
        return this.workflowId;
    }

    getCreatedAt () {
        return this.createdAt;
    }

    getCreatedById () {
        return this.createdById;
    }

    activate () {
        this.status = 'active';
    }

    deactivate () {
        this.status = 'inactive';
    }

    addVariable (variable) {
        this.variables.push(variable);
    }

    addElement (element) {
        this.elements.push(element);
    }

    removeVariableById (idToBeRemoved) {
        this.variables = this.variables.filter(variable => idToBeRemoved !== variable.getId());
    }

    removeElementById (idToBeRemoved) {
        this.elements = this.elements.filter(element => idToBeRemoved !== element.getId());
    }

    fork ({
        number,
        createdById,
    }) {
        return WorkflowVersion.create({
            number,
            createdById,
            workflowId: this.workflowId,
            variables: this.variables.map(variable => variable.clone()),
            elements: this.elements.map(element => element.clone()),
        });
    }
}

export class WorkflowVariable {
    static create ({
        name,
        type,
        description,
        defaultValue,
        markedAsInputOption,
        markedAsOutputOption,
    }) {
        return new WorkflowVariable({
            id: randomUUID(),
            name,
            type,
            description,
            defaultValue,
            markedAsInputOption,
            markedAsOutputOption,
        });
    }

    constructor ({
        id,
        name,
        type,
        description,
        defaultValue,
        markedAsInputOption,
        markedAsOutputOption,
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

        if (!description) {
            throw new Error('Description is required.');
        }

        if (typeof defaultValue !== type) {
            throw new Error('Default value must be of the same type as the variable. Expected ' + type + ' but got ' + typeof defaultValue + '.');
        }

        if (typeof markedAsInputOption !== 'boolean') {
            throw new Error('Marked as input option is invalid.');
        }

        if (typeof markedAsOutputOption !== 'boolean') {
            throw new Error('Marked as output option is invalid.');
        }

        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.defaultValue = defaultValue;
        this.markedAsInputOption = markedAsInputOption;
        this.markedAsOutputOption = markedAsOutputOption;
    }

    getId () {
        return this.id;
    }

    getName () {
        return this.name;
    }

    getType () {
        return this.type;
    }

    getDescription () {
        return this.description;
    }

    getDefaultValue () {
        return this.defaultValue;
    }

    getMarkedAsInputOption () {
        return this.markedAsInputOption;
    }

    getMarkedAsOutputOption () {
        return this.markedAsOutputOption;
    }

    clone () {
        return WorkflowVariable.create({
            name: this.name,
            type: this.type,
            description: this.description,
            defaultValue: this.defaultValue,
            markedAsInputOption: this.markedAsInputOption,
            markedAsOutputOption: this.markedAsOutputOption,
        });
    }
}

export class WorkflowElement {}

export class WorkflowStartElement {
    static create () {
        return new WorkflowStartElement({
            id: randomUUID(),
            nextElementId: null,
        });
    }

    constructor ({
        id,
        nextElementId,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        this.id = id;
        this.nextElementId = nextElementId;
    }

    getId () {
        return this.id;
    }

    getType () {
        return 'start';
    }

    getName () {
        return 'Start';
    }

    getNextElementId () {
        return this.nextElementId;
    }

    clone () {
        return new WorkflowStartElement();
    }
}

export class WorkflowEndElement {
    static create () {
        return new WorkflowEndElement({
            id: randomUUID(),
        });
    }

    constructor ({
        id,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        this.id = id;
    }

    getId () {
        return this.id;
    }

    getType () {
        return 'end';
    }

    getName () {
        return 'End';
    }

    clone () {
        return new WorkflowEndElement();
    }
}

export class WorkflowIfElement {
    static create ({
        conditions,   
    }) {
        return new WorkflowIfElement({
            id: randomUUID(),
            conditions,
        });
    }

    constructor ({
        id,
        conditions,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!conditions) {
            throw new Error('Conditions are required.');
        }

        this.id = id;
        this.conditions = conditions;
    }

    getId () {
        return this.id;
    }

    getConditions () {
        return this.conditions;
    }

    clone () {
        return new WorkflowIfElement({
            id: this.id,
            conditions: this.conditions.map(condition => condition.clone()),
        });
    }
}

export class WorkflowCondition {
    static create ({
        variableId,
        operation,
        value,
    }) {
        return new WorkflowCondition({
            id: randomUUID(),
            variableId,
            operation,
            value,
        });
    }

    constructor ({
        id,
        variableId,
        operation,
        value,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operation) {
            throw new Error('Operation is required.');
        }

        if (value === undefined) {
            throw new Error('Value cannot be undefined.');
        }

        this.id = id;
        this.variableId = variableId;
        this.operation = operation;
        this.value = value;
    }

    getId () {
        return this.id;
    }

    getVariableId () {
        return this.variableId;
    }

    getOperation () {
        return this.operation;
    }

    getValue () {
        return this.value;
    }

    clone () {
        return new WorkflowCondition({
            id: this.id,
            variableId: this.variableId,
            operation: this.operation,
            expression: this.expression,
        });
    }
}

export class WorkflowAssignElement {
    static create ({
        name,
        description,
        assignments,
    }) {
        return new WorkflowVersion({
            id: randomUUID(),
            name,
            description,
            assignments,
        });
    }

    constructor ({
        id,
        name,
        description,
        assignments,
    }) {
        if (!id) {
            throw new Error('Id is required.');
        }

        if (!name) {
            throw new Error('Name is required.');
        }

        if (!assignments) {
            throw new Error('Assignments are required.');
        }

        this.id = id;
        this.name = name;
        this.description = description;
        this.assignments = assignments;
    }

    getId () {
        return this.id;
    }

    getName () {
        return this.name;
    }

    getDescription () {
        return this.description;
    }

    getAssignments () {
        return this.assignments;
    }

    clone () {
        return new WorkflowAssignElement({
            id: this.id,
            name: this.name,
            description: this.description,
            assignments: this.assignments.map(assignment => assignment.clone()),
        });
    }
}

export class WorkflowAssignment {
    static create ({
        variableId,
        operation,
        value,
    }) {
        return new WorkflowAssignment({
            id: randomUUID(),
            variableId,
            operation,
            value,
        });
    }

    constructor ({
        id,
        variableId,
        operation,
        value,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operation) {
            throw new Error('Operation is required.');
        }

        if (value === undefined) {
            throw new Error('Value cannot be undefined.');
        }

        this.id = id;
        this.variableId = variableId;
        this.operation = operation;
        this.value = value;
    }

    getId () {
        return this.id;
    }

    getVariableId () {
        return this.variableId;
    }

    getOperation () {
        return this.operation;
    }

    getValue () {
        return this.value;
    }

    clone () {
        return new WorkflowAssignment({
            id: this.id,
            variableId: this.variableId,
            operation: this.operation,
            value: this.value,
        });
    }
}