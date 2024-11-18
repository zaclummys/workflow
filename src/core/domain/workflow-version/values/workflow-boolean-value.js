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
}