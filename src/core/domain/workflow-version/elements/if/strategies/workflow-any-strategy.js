export default class WorkflowAnyStrategy {
    constructor (conditions) {
        this.conditions = conditions;
    }

    getType () {
        return 'any';
    }

    evaluate (context) {
        return this.conditions.some(condition => condition.evaluate(context));
    }
}