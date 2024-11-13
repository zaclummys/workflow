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

    set (other) {
        return new WorkflowNumberValue(other.number);
    }
    
    add (other) {
        return new WorkflowNumberValue(this.number + other.number);
    }

    subtract (other) {
        return new WorkflowNumberValue(this.number - other.number);
    }

    multiply (other) {
        return new WorkflowNumberValue(this.number * other.number);
    }

    divide (other) {
        return new WorkflowNumberValue(this.number / other.number);
    }

    assign (operator, valueToBeAssigned) {
        switch (operator) {
            case 'set':
                return this.set(valueToBeAssigned);
            
            case 'add':
                return this.add(valueToBeAssigned);

            case 'subtract':
                return this.subtract(valueToBeAssigned);

            case 'multiply':
                return this.multiply(valueToBeAssigned);

            case 'divide':
                return this.divide(valueToBeAssigned);

            default:
                throw new Error(`Operator ${operator} is not supported for ${this.constructor.name}`);
        }
    }
}