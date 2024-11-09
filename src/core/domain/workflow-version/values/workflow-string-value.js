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

    set (string) {
        return new WorkflowStringValue(string);
    }

    contains (string) {
        return this.string.includes(string);
    }

    concat (string) {
        return new StringValue(this.string + string);
    }

    assign (operator, valueToBeAssigned) {
        switch (operator) {
            case 'set':
                return this.set(valueToBeAssigned);
            
            case 'concat':
                return this.concat(valueToBeAssigned);

            default:
                throw new Error(`Operator ${operator} is not supported for ${this.constructor.name}`);
        }
    }
}
