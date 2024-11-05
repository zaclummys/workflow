export default class WorkflowValue {
    assign (operator, valueToBeAssigned) {
        throw new Error(`Method not implemented for ${this.constructor.name}`);
    }

    compare (operator, valueToBeCompared) {
        throw new Error(`Method not implemented for ${this.constructor.name}`);
    }
}