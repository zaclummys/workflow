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
        value,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (value === undefined) {
            throw new Error('Value cannot be undefined.');
        }

        this.id = id;
        this.variableId = variableId;
        this.value = value;
    }

    getId() {
        return this.id;
    }

    getVariableId() {
        return this.variableId;
    }

    getValue() {
        return this.value;
    }

    getType () {
        throw new Error(`Not implemented for ${this.constructor.name}.`);
    }

    assign (context) {
        throw new Error(`Not implemented for ${this.constructor.name}.`);
    }
}

export class WorkflowSetAssignment extends WorkflowAssignment {
    getType () {
        return 'set';
    }

    assign (context) {
        const variable = context.findVariableById(this.variableId);

        variable.set(this.value);
    }
} 

export class WorkflowAddAssignment extends WorkflowAssignment {
    getType () {
        return 'add';
    }

    assign (context) {
        const variable = context.findVariableById(this.variableId);

        variable.add(this.value);
    }
}

export class WorkflowSubtractAssignment extends WorkflowAssignment {
    getType () {
        return 'subtract';
    }

    assign (context) {
        const variable = context.findVariableById(this.variableId);

        variable.subtract(this.value);
    }
}

export class WorkflowMultiplyAssignment extends WorkflowAssignment {
    getType () {
        return 'multiply';
    }

    assign (context) {
        const variable = context.findVariableById(this.variableId);

        variable.multiply(this.value);
    }
}

export class WorkflowDivideAssignment extends WorkflowAssignment {
    getType () {
        return 'divide';
    }
    
    assign (context) {
        const variable = context.findVariableById(this.variableId);

        variable.divide(this.value);
    }
}
