import WorkflowValue from './workflow-value';

export default  class WorkflowStringValue extends WorkflowValue {
    constructor (string) {
        super();

        if (typeof string !== 'string') {
            throw new Error('Expected a string');
        }

        this.string = string;
    }

    getType () {
        return 'string';
    }

    getString () {
        return this.string;
    }
}