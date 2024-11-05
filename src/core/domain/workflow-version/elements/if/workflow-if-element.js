import WorkflowIfAllStrategy from '~/core/domain/workflow-version/elements/if/strategies/workflow-all-strategy';
import WorkflowIfAnyStrategy from '~/core/domain/workflow-version/elements/if/strategies/workflow-any-strategy';

import WorkflowElement from '~/core/domain/workflow-version/elements/workflow-element';

export default class WorkflowIfElement extends WorkflowElement {
    static createStrategy (strategy) {
        switch (strategy) {
            case 'all':
                return new WorkflowIfAllStrategy();

            case 'any':
                return new WorkflowIfAnyStrategy();
                
            default:
                throw new Error(`Unexpected strategy: ${strategy}`);
        }
    }
    
    static createConditions (conditions) {
        return conditions.map(conditionData => {
            return new WorkflowCondition(conditionData);
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
        positionX,
        positionY,
    }) {
        super({
            id,
            name,
            positionX,
            positionY,
        });

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
        this.nextElementIdIfTrue = nextElementIdIfTrue;
        this.nextElementIdIfFalse = nextElementIdIfFalse;

        this.strategy = WorkflowIfElement.createStrategy(strategy);
        this.conditions = WorkflowIfElement.createConditions(conditions);
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

    getConditions() {
        return this.conditions;
    }

    getStrategy() {
        return this.strategy.getType();
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

    execute (context) {
        const satisfied = this.strategy.evaluate(context);

        if (satisfied) {
            return this.nextElementIdIfTrue;
        } else {
            return this.nextElementIdIfFalse;
        }
    }
}