import WorkflowValue from './workflow-value';

export default class WorkflowBooleanValue extends WorkflowValue {
    constructor (boolean) {
        super();

        if (typeof boolean !== 'boolean') {
            throw new Error('Expected a boolean.');
        }

        this.boolean = boolean;
    }

    getType () {
        return 'boolean';
    }

    getBoolean () {
        return this.boolean;
    }

    set (boolean) {
        return new WorkflowBooleanValue(boolean);
    }

    and (other) {
        return new BooleanValue(this.boolean && other);
    }

    or (other) {
        return new BooleanValue(this.boolean || other);
    }
}