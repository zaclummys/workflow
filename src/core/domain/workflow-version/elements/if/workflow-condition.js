export default class WorkflowCondition {
    constructor ({
        id,
        variableId,
        operator,
        operand,
    }) {
        if (!id) {
            throw new Error('ID is required.')
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operator) {
            throw new Error('Operator is required.');
        }

        if (!operand) {
            throw new Error('Operand be is required.');
        }

        this.id = id;
        this.variableId = variableId;
        this.operator = operator;
        this.operand = operand;
    }

    getId() {
        return this.id;
    }

    getVariableId () {
        return this.variableId;
    }

    getOperator () {
        return this.operator;
    }

    getOperand () {
        return this.operand;
    }

    compare (context) {

    }
}

