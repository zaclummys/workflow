import { WorkflowElement } from './workflow-element';

export class WorkflowAssignElement extends WorkflowElement {
    constructor({
        id,
        positionX,
        positionY,
        name,
        description,
        assignments,
        nextElementId,
    }) {
        super({ id, positionX, positionY });

        if (!name) {
            throw new Error('Name is required.');
        }

        if (description == null) {
            throw new Error('Description cannot be null.');
        }

        if (!assignments) {
            throw new Error('Assignments are required.');
        }

        this.name = name;
        this.description = description;
        this.assignments = assignments;
        this.nextElementId = nextElementId;
    }

    getType () {
        return 'assign';
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getAssignments() {
        return this.assignments;
    }

    getNextElementId () {
        return this.nextElementId;
    }

    setNextElementId (nextElementId) {
        this.nextElementId = nextElementId;
    }

    setDefaultNextElementId (defaultNextElementId) {
        this.nextElementId = defaultNextElementId;
    }

    execute (context) {
        for (const assignment of this.assignments) {
            assignment.assign(context);
        }

        return this.nextElementId;
    }
}

export class WorkflowAssignment {
    constructor({
        id,
        variableId,
        operator,
        value,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operator) {
            throw new Error('Operator is required.');
        }

        if (value === undefined) {
            throw new Error('Value cannot be undefined.');
        }

        this.id = id;
        this.variableId = variableId;
        this.operator = operator;
        this.value = value;
    }

    getId() {
        return this.id;
    }

    getVariableId() {
        return this.variableId;
    }

    getOperator() {
        return this.operator;
    }

    getValue() {
        return this.value;
    }

    assign (context) {
        const variable = context.findVariableById(this.variableId);

        switch (this.operator) {
            case 'set':
                variable.set(this.value);
            break;

            case 'add':
                variable.add(this.value);
            break;

            case 'subtract':
                variable.subtract(this.value);
            break;

            case 'multiply':
                variable.multiply(this.value);
            break;

            case 'divide':
                variable.divide(this.value);
            break;

            default:
                throw new Error(`Unexpected operator: ${this.operator}`);
        }
    }
}