export default class WorkflowAllStrategy {
    constructor (conditions) {
        this.conditions = conditions;
    }

    getType () {
        return 'all';
    }

    evaluate (context) {
        return this.conditions.every(condition => condition.evaluate(context));
    }
}