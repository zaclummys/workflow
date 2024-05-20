import { randomUUID } from 'crypto';

export class WorkflowVersion {
    static create ({
        workflowId,
        createdById,
    }) {
        return new WorkflowVersion({
            workflowId,
            createdById,
            id: randomUUID(),
            number: 1,
            variables: [],
            elements: [],
            createdAt: new Date(),
        });
    }

    constructor ({
        id,
        number,
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

    getWorkflowId () {
        return this.workflowId;
    }

    getCreatedById () {
        return this.createdById;
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

    fork ({ forkedById }) {
        return WorkflowVersion.create({
            createdById: forkedById,
            number: this.number + 1,
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
        input,
        output,
    }) {
        return new WorkflowVariable({
            id: randomUUID(),
            name,
            type,
            description,
            defaultValue,
            input,
            output,
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
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!name) {
            throw new Error('Name is required.');
        }

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!description) {
            throw new Error('Description is required.');
        }

        if (!defaultValue) {
            throw new Error('Default value is required.');
        }

        if (!markedAsInputOption) {
            throw new Error('Marked as input option is required.');
        }

        if (!markedAsOutputOption) {
            throw new Error('Marked as output option is required.');
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

    getMarkedAsInputOptionOption () {
        return this.markedAsInputOption;
    }

    getMarkedAsOutputOptionOption () {
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

export class WorkflowExpression {}

export class WorkflowElement {}
export class WorkflowStartElement {}
export class WorkflowEndElement {}
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

    addCondition (condition) {
        this.conditions.push(condition);
    }

    removeConditionById (id) {
        this.conditions = this.conditions.filter(condition => condition.id !== id);
    }

    clone () {
        return WorkflowIfElement.create({
            conditions: this.conditions.map(condition => condition.clone()),
        });
    }
}

export class WorkflowCondition {
    static create ({
        variableId,
        operation,
        expression,
    }) {
        return new WorkflowCondition({
            id: randomUUID(),
            variableId,
            operation,
            expression,
        });
    }

    constructor ({
        id,
        variableId,
        operation,
        expression,
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

        if (!expression) {
            throw new Error('Expression is required.');
        }

        this.id = id;
        this.variableId = variableId;
        this.operation = operation;
        this.expression = expression;
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

    getExpression () {
        return this.expression;
    }

    clone () {
        return WorkflowCondition.create({
            variableId: this.variableId,
            operation: this.operation,
            expression: this.expression,
        });
    }
}

export class WorkflowAssignmentElement {}