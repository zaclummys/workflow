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