import { WorkflowElement } from './workflow-element';

export class WorkflowIfElement extends WorkflowElement {
    constructor({
        id, name, description, strategy, conditions, nextElementIdIfTrue, nextElementIdIfFalse, positionX, positionY,
    }) {
        super({ id, name, positionX, positionY });

        if (!name) {
            throw new Error('Name is required');
        }

        if (description == null) {
            throw new Error('Description cannot be null');
        }

        if (!strategy) {
            throw new Error('Strategy is required');
        }

        if (!conditions) {
            throw new Error('Conditions are required');
        }

        this.name = name;
        this.description = description;
        this.strategy = strategy;
        this.conditions = conditions;
        this.nextElementIdIfTrue = nextElementIdIfTrue;
        this.nextElementIdIfFalse = nextElementIdIfFalse;
    }

    getType() {
        return 'if';
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

    setNextElementIdIfTrue(nextElementIdIfTrue) {
        this.nextElementIdIfTrue = nextElementIdIfTrue;
    }

    setNextElementIdIfFalse(nextElementIdIfFalse) {
        this.nextElementIdIfFalse = nextElementIdIfFalse;
    }

    setDefaultNextElementId(defaultNextElementId) {
        this.nextElementIdIfTrue = defaultNextElementId;
    }

    execute(context) {
        switch (this.strategy) {
            case 'all': {
                const allConditionsTrue = this.conditions.every(condition => condition.evaluate(context));

                if (allConditionsTrue) {
                    return this.nextElementIdIfTrue;
                } else {
                    return this.nextElementIdIfFalse;
                }
            }

            case 'any': {
                const anyConditionTrue = this.conditions.some(condition => condition.evaluate(context));

                if (anyConditionTrue) {
                    return this.nextElementIdIfTrue;
                } else {
                    return this.nextElementIdIfFalse;
                }
            }

            default:
                throw new Error(`Unexpected strategy: ${this.strategy}`);
        }
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

    evaluate (context) {
        const variable = context.findVariableById(this.variableId);

        switch (this.operator) {
            case 'equal-to':
                return variable.equalTo(this.value);

            case 'different-than':
                return variable.differentThan(this.value);

            case 'greater-than':
                return variable.greaterThan(this.value);

            case 'less-than':
                return variable.lessThan(this.value);

            default:
                throw new Error(`Unexpected operator: ${this.operator}`);
        }
    }
}