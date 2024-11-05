export default class WorkflowExecutionVariable {
    constructor ({
        variableId, 
        value,
     }) {
        if (!variableId) {
            throw new Error('Variable ID is required');
        }

        if (value == null) {
            throw new Error('Value cannot be null');
        }

        this.variableId = variableId;
        this.value = value;
    }

    getVariableId () {
        return this.variableId;
    }

    getValue () {
        return this.value;
    }

    setValue (value) {
        if (value == null) {
            throw new Error('Value cannot be null');
        }

        this.value = value;
    }

    assign (operator, valueToBeAssigned) {
        this.value = this.value.assign(operator, valueToBeAssigned);
    }

    compare (operator, valueToBeCompared) {
        return this.value.compare(operator, valueToBeCompared);
    }
}