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

        const elementIds = elements.map(element => element.getId());

        for (const element of elements) {
            if (element instanceof WorkflowIfElement) {
                const nextElementIdIfTrue = element.getNextElementIdIfTrue();
                const nextElementIdIfFalse = element.getNextElementIdIfFalse();

                const nextElementIdIfTrueExists = elementIds.includes(nextElementIdIfTrue);
                const nextElementIdIfFalseExists = elementIds.includes(nextElementIdIfFalse);

                if (nextElementIdIfTrue && !nextElementIdIfTrueExists) {
                    throw new Error(`Next Element ID If True does not exist: ${nextElementIdIfTrue}`)
                }

                if (nextElementIdIfFalse && !nextElementIdIfFalseExists) {
                    throw new Error(`Next Element ID If False does not exist: ${nextElementIdIfFalse}`)
                }
            } else {
                const nextElementId = element.getNextElementId();
                const nextElementIdIfExists = elementIds.includes(nextElementId);

                if (nextElementId && !nextElementIdIfExists) {
                    throw new Error(`Next Element ID does not exist: ${nextElementId}`)
                }
            }
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

        if (previousElement instanceof WorkflowIfElement) {
            switch (previousElementBranch) {
                case 'true':
                    element.setDefaultNextElementId(previousElement.getNextElementIdIfTrue());
                    previousElement.setNextElementIdIfTrue(element.getId());
                break;
    
                case 'false':
                    element.setDefaultNextElementId(previousElement.getNextElementIdIfFalse());
                    previousElement.setNextElementIdIfFalse(element.getId());
                break;
    
                default:
                    throw new Error(`Invalid branch: ${previousElementBranch}.`);
            }
        } else {
            element.setDefaultNextElementId(previousElement.getNextElementId());
            previousElement.setNextElementId(element.getId());
        }
        
        this.elements.push(element);
    }

    editElement ({
        elementId,
        elementData,
    }) {
        const element = this.findElementById(elementId);

        if (!element) {
            throw new Error(`Element not found: ${elementId}`);
        }

        if (element instanceof WorkflowStartElement) {
            throw new Error('Cannot edit a start element.');
        }

        element.edit(elementData);
    }

    removeElement ({
        elementId,
        elementBranchToKeep,
    }) {
        if (!elementId) {
            throw new Error('Element ID was not provided');
        }

        const element = this.findElementById(elementId);

        if (!element) {
            throw new Error(`Element not found: ${elementId}`);
        }

        if (element instanceof WorkflowStartElement) {
            throw new Error('Cannot remove a start element.');
        }

        let elementIdToKeep;

        if (element instanceof WorkflowIfElement) {
            const nextElementIdIfFalse = element.getNextElementIdIfFalse();
            const nextElementIdIfTrue = element.getNextElementIdIfTrue();

            switch (elementBranchToKeep) {
                case 'true':
                    if (nextElementIdIfFalse) {
                        this.removeElement({
                            elementId: nextElementIdIfFalse,
                        });
                    }

                    elementIdToKeep = element.getNextElementIdIfTrue();
                break;

                case 'false':
                    if (nextElementIdIfTrue) {
                        this.removeElement({
                            elementId: nextElementIdIfTrue,
                        });
                    }

                    elementIdToKeep = element.getNextElementIdIfFalse();
                break;

                default:
                    if (nextElementIdIfFalse) {
                        this.removeElement({
                            elementId: nextElementIdIfFalse,
                        });
                    }

                    if (nextElementIdIfTrue) {
                        this.removeElement({
                            elementId: nextElementIdIfTrue,
                        });
                    }
                break;
            }
        } else {
            if (elementBranchToKeep) {
                throw new Error('Cannot specify branch to keep in this type of element');
            }

            elementIdToKeep = element.getNextElementId();
        }

        this.elements.forEach(candidatePreviousElement => {
            if (candidatePreviousElement instanceof WorkflowIfElement) {
                if (elementId === candidatePreviousElement.getNextElementIdIfTrue()) {
                    candidatePreviousElement.setNextElementIdIfTrue(elementIdToKeep);
                }
                
                if (elementId === candidatePreviousElement.getNextElementIdIfFalse()) {
                    candidatePreviousElement.setNextElementIdIfFalse(elementIdToKeep);
                }
            } else {
                if (elementId === candidatePreviousElement.getNextElementId()) {
                    candidatePreviousElement.setNextElementId(elementIdToKeep);
                }
            }
        });

        this.elements = this.elements.filter(element => elementId !== element.getId());
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
        return [];
    }
}

export class WorkflowVariable {
    static create({
        name,
        type,
        description,
        defaultValue,
        markedAsInput,
        markedAsOutput,
    }) {
        return new WorkflowVariable({
            id: randomUUID(),
            name,
            type,
            description,
            defaultValue,
            markedAsInput,
            markedAsOutput,
        });
    }

    constructor({
        id,
        name,
        type,
        description,
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

        if (defaultValue === undefined) {
            throw new Error('Default value cannot be undefined');
        }

        if (defaultValue !== null && typeof defaultValue !== type) {
            throw new Error('Default value must be of the same type as the variable. Expected ' + type + ' but got ' + typeof defaultValue + '.');
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

    getDefaultValue() {
        return this.defaultValue;
    }

    getMarkedAsInput() {
        return this.markedAsInput;
    }

    getMarkedAsOutput() {
        return this.markedAsOutput;
    }

    clone() {
        return WorkflowVariable.create({
            name: this.name,
            type: this.type,
            description: this.description,
            defaultValue: this.defaultValue,
            markedAsInput: this.markedAsInput,
            markedAsOutput: this.markedAsOutput,
        });
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

    clone() {
        return new WorkflowStartElement();
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
        operator,
        value,
    }) {
        return new WorkflowCondition({
            variableId,
            operator,
            value,
        });
    }

    constructor({
        variableId,
        operator,
        value,
    }) {
        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operator) {
            throw new Error('Operator is required.');
        }

        if (value === undefined) {
            throw new Error('Value cannot be undefined.');
        }

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

    clone() {
        return new WorkflowCondition({
            variableId: this.variableId,
            operator: this.operator,
            expression: this.expression,
        });
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
    constructor({
        variableId,
        operator,
        value,
    }) {
        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operator) {
            throw new Error('Operator is required.');
        }

        if (value === undefined) {
            throw new Error('Value cannot be undefined.');
        }

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

    clone() {
        return new WorkflowAssignment({
            variableId: this.variableId,
            operator: this.operator,
            value: this.value,
        });
    }
}