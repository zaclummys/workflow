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
                        assignments: elementData.assignments.map(assignmentData => new WorkflowAssignment(assignmentData)),
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

    execute (inputValues) {
        return [];
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

export class WorkflowElement {
    constructor ({
        id,
        positionX,
        positionY,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (positionX == null) {
            throw new Error('Position X cannot be null');
        }

        if (positionY == null) {
            throw new Error('Position Y cannot be null');
        }

        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getId() {
        return this.id;
    }

    getPositionX () {
        return this.positionX;
    }

    getPositionY () {
        return this.positionY;
    }
}

export class WorkflowStartElement extends WorkflowElement {
    static create () {
        return new WorkflowStartElement({
            id: randomUUID(),
            positionX: 0.0,
            positionY: 0.0,
        });
    }
    
    constructor ({
        id,
        positionX,
        positionY,
        nextElementId,
    }) {
        super({ id, positionX, positionY });

        this.nextElementId = nextElementId;
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
}

export class WorkflowIfElement extends WorkflowElement {
    constructor({
        id,
        name,
        description,
        strategy,
        conditions,
        nextElementIdIfTrue,
        nextElementIdIfFalse,
        positionX,
        positionY,
    }) {
        super({ id, name, positionX, positionY });

        if (!name) {
            throw new Error('Name is required');
        }

        this.name = name;
        this.description = description;
        this.strategy = strategy || 'all';
        this.conditions = conditions || [];
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
        this.nextElementIdIfTrue = defaultNextElementId;
    }

    edit ({
        name,
        description,
        strategy,
        conditions,
    }) {
        this.name = name;
        this.description = description;
        this.strategy = strategy;
        this.conditions = conditions.map(condition => new WorkflowCondition(condition));
    }
}

export class WorkflowCondition {
    constructor({
        id,
        variableId,
        operator,
        value,
    }) {
        if (!id) {
            throw new Error('ID is required.')
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
}

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

        this.name = name;
        this.description = description;
        this.assignments = assignments || [];
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

    edit ({
        name,
        description,
        assignments,
    }) {
        this.name = name;
        this.description = description;
        this.assignments = assignments.map(assignments => new WorkflowAssignment(assignments));
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
}