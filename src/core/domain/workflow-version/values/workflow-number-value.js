import WorkflowValue from './workflow-value';

export default class WorkflowNumberValue extends WorkflowValue {
    constructor (number) {
        super();

        if (typeof number !== 'number') {
            throw new Error('Expected a number');
        }

        this.number = number;
    }

    getType () {
        return 'number';
    }

    getNumber () {
        return this.number;
    }
}