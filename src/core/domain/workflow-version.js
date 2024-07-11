import { randomUUID } from 'crypto';

export class WorkflowVersion {
    static create({
        number,
        workflowId,
        createdById,
    }) {
        const startElement = WorkflowStartElement.create();

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
        connections,
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
        this.connections = connections;
        this.workflowId = workflowId;
        this.forkedFromId = forkedFromId;
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

    activate() {
        this.status = 'active';
    }

    deactivate() {
        this.status = 'inactive';
    }

    addVariable(variable) {
        this.variables.push(variable);
    }

    addElement ({
        element,
        previousElementId,
        previousElementBranch,
    }) {
        if (element instanceof WorkflowStartElement) {
            throw new Error('Cannot add a start element.');
        }

        const previousElement = this.findElementById(previousElementId);

        if (!previousElement) {
            throw new Error(`Previous element not found: ${previousElementId}`);
        }

        previousElement.connect(element, previousElementBranch);
        
        this.elements.push(element);
    }

    removeVariableById(idToBeRemoved) {
        this.variables = this.variables.filter(variable => idToBeRemoved !== variable.getId());
    }

    removeElementById(idToBeRemoved) {
        this.elements = this.elements.filter(element => idToBeRemoved !== element.getId());
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

    execute (inputValues) {
        const values = [];

        const startElement = this.getStartElement();

        if (!startElement) {
            throw new Error('Start element not found.');
        }

        let currentElement = startElement;

        const maxIterations = 1000;

        let currIteration;

        loop:
        for (currIteration = 0; currIteration < maxIterations; currIteration++) {
            if (!currentElement) {
                break;
            }

            switch (currentElement.constructor) {
                case WorkflowStartElement: {
                    currentElement = this.findElementById(currentElement.getNextElementId());
                }

                case WorkflowIfElement: {
                    const evaluateConditionHandler = condition => {
                        const executionVariable = executionVariables.find(executionVariable => executionVariable.variableId === condition.getVariableId());

                        if (!executionVariable) {
                            throw new Error('Execution variable not found.');
                        }

                        switch (condition.getOperation()) {
                            case '==':
                                return executionVariable.value === condition.getValue();

                            case '!=':
                                return executionVariable.value !== condition.getValue();

                            case '>':
                                return executionVariable.value > condition.getValue();

                            case '<':
                                return executionVariable.value < condition.getValue();

                            case '>=':
                                return executionVariable.value >= condition.getValue();

                            case '<=':
                                return executionVariable.value <= condition.getValue();

                            default:
                                throw new Error('Unknown operation.');
                        }
                    };

                    switch (currentElement.getStrategy()) {
                        case 'all': {
                            const condition = currentElement
                                .getConditions()
                                .every(evaluateConditionHandler);

                            if (condition) {
                                currentElement = this.findElementById(currentElement.getNextElementIdIfTrue());
                            } else {
                                currentElement = this.findElementById(currentElement.getNextElementIdIfFalse());
                            }
                        }

                        case 'any': {
                            const condition = currentElement
                                .getConditions()
                                .some(evaluateConditionHandler);

                            if (condition) {
                                currentElement = this.findElementById(currentElement.getNextElementIdIfTrue());
                            } else {
                                currentElement = this.findElementById(currentElement.getNextElementIdIfFalse());
                            }
                        }
                    }
                }

                default:
                    throw new Error('Unknown element type.');
            }
        }

        if (currIteration === maxIterations) {
            throw new Error('Max iterations reached.');
        }

        return [];
    }

    fork({
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
    static create({
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

    constructor({
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

    getDefaultValue() {
        return this.defaultValue;
    }

    getMarkedAsInputOption() {
        return this.markedAsInputOption;
    }

    getMarkedAsOutputOption() {
        return this.markedAsOutputOption;
    }

    clone() {
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
            id: randomUUID()
        });
    }

    constructor({
        id,
        nextElementId,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        this.id = id;
        this.nextElementId = nextElementId;
    }

    getId() {
        return this.id;
    }

    getType() {
        return 'start';
    }

    getName() {
        return 'Start';
    }

    getNextElementId() {
        return this.nextElementId;
    }

    setNextElementId (nextElementId) {
        this.nextElementId = nextElementId;
    }

    setDefaultNextElementId (nextElementId) {
        this.nextElementId = nextElementId;
    }

    connect (element) {
        element.setDefaultNextElementId(this.getNextElementId());
        this.setNextElementId(element.getId());
    }

    clone() {
        return new WorkflowStartElement();
    }
}

export class WorkflowIfElement {
    static create({
        name,
        description,
        strategy,
        conditions,
    }) {
        return new WorkflowIfElement({
            id: randomUUID(),
            name,
            description,
            strategy,
            conditions,
        });
    }

    constructor({
        id,
        name,
        description,
        strategy,
        conditions,
        nextElementIdIfTrue,
        nextElementIdIfFalse,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!name) {
            throw new Error('Name is required.');
        }

        if (!strategy) {
            throw new Error('Strategy is required.');
        }

        if (!conditions) {
            throw new Error('Conditions are required.');
        }

        this.id = id;
        this.name = name;
        this.description = description;
        this.strategy = strategy;
        this.conditions = conditions;
        this.nextElementIdIfTrue = nextElementIdIfTrue;
        this.nextElementIdIfFalse = nextElementIdIfFalse;
    }

    getType () {
        return 'if';
    }

    getId() {
        return this.id;
    }

    getName () {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getStrategy() {
        return this.strategy;
    }

    getConditions() {
        return this.conditions;
    }

    getNextElementIdIfTrue() {
        return this.nextElementIdIfTrue;
    }

    getNextElementIdIfFalse() {
        return this.nextElementIdIfFalse;
    }

    setNextElementIdIfTrue (nextElementIdIfTrue) {
        this.nextElementIdIfTrue = nextElementIdIfTrue;
    }

    setNextElementIdIfFalse (nextElementIdIfFalse) {
        this.nextElementIdIfFalse = nextElementIdIfFalse;
    }

    setDefaultNextElementId (defaultNextElementId) {
        this.setNextElementIdIfTrue(defaultNextElementId);
    }

    connect (element, branch) {
        switch (branch) {
            case 'true':
                element.setDefaultNextElementId(this.getNextElementIdIfTrue());
                this.setNextElementIdIfTrue(element.getId());
            break;

            case 'false':
                element.setDefaultNextElementId(this.getNextElementIdIfFalse());
                this.setNextElementIdIfFalse(element.getId());
            break;

            default:
                throw new Error('Invalid branch.');
        }
    }

    clone() {
        return new WorkflowIfElement({
            id: this.id,
            conditions: this.conditions.map(condition => condition.clone()),
        });
    }
}

export class WorkflowCondition {
    static create({
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

    constructor({
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

    getId() {
        return this.id;
    }

    getVariableId() {
        return this.variableId;
    }

    getOperation() {
        return this.operation;
    }

    getValue() {
        return this.value;
    }

    clone() {
        return new WorkflowCondition({
            id: this.id,
            variableId: this.variableId,
            operation: this.operation,
            expression: this.expression,
        });
    }
}

export class WorkflowAssignElement {
    static create({
        name,
        description,
    }) {
        return new WorkflowAssignElement({
            id: randomUUID(),
            name,
            description,
            assignments: [],
        });
    }

    constructor({
        id,
        name,
        description,
        assignments,
        nextElementId,
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
        this.setNextElementId(defaultNextElementId);
    }

    connect (element) {
        element.setDefaultNextElementId(this.getNextElementId());
        this.setNextElementId(element.getId());
    }

    clone() {
        return new WorkflowAssignElement({
            id: this.id,
            name: this.name,
            description: this.description,
            assignments: this.assignments.map(assignment => assignment.clone()),
        });
    }
}

export class WorkflowAssignment {
    static create({
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

    constructor({
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

    getId() {
        return this.id;
    }

    getVariableId() {
        return this.variableId;
    }

    getOperation() {
        return this.operation;
    }

    getValue() {
        return this.value;
    }

    clone() {
        return new WorkflowAssignment({
            id: this.id,
            variableId: this.variableId,
            operation: this.operation,
            value: this.value,
        });
    }
}

export class WorkflowConnection {
    static create ({
        previousElementId,
        nextElementId,
    }) {
        return new WorkflowConnection({
            id: randomUUID(),
            previousElementId,
            nextElementId,
        });
    }

    constructor ({
        id,
        previousElementId,
        nextElementId,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!previousElementId) {
            throw new Error('Previous element ID is required.');
        }

        if (!nextElementId) {
            throw new Error('Next element ID is required.');
        }

        this.id = id;
        this.previousElementId = previousElementId;
        this.nextElementId = nextElementId;
    }

    getId() {
        return this.id;
    }

    getPreviousElementId() {
        return this.previousElementId;
    }

    getNextElementId() {
        return this.nextElementId;
    }

}

export class WorkflowBranchConnection {
    static create ({
        previousElementId,
        nextElementIdIfTrue,
        nextElementIdIfFalse,
    }) {
        return new WorkflowBranchConnection({
            id: randomUUID(),
            previousElementId,
            nextElementIdIfTrue,
            nextElementIdIfFalse,
        });
    }

    constructor ({
        id,
        previousElementId,
        nextElementIdIfTrue,
        nextElementIdIfFalse,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!previousElementId) {
            throw new Error('Previous element ID is required.');
        }

        if (!nextElementIdIfTrue) {
            throw new Error('Next element ID if true is required.');
        }

        if (!nextElementIdIfFalse) {
            throw new Error('Next element ID if false is required.');
        }

        this.id = id;
        this.previousElementId = previousElementId;
        this.nextElementIdIfTrue = nextElementIdIfTrue;
        this.nextElementIdIfFalse = nextElementIdIfFalse;
    }

    getId() {
        return this.id;
    }

    getPreviousElementId() {
        return this.previousElementId;
    }

    getNextElementIdIfTrue() {
        return this.nextElementIdIfTrue;
    }

    getNextElementIdIfFalse() {
        return this.nextElementIdIfFalse;
    }
}