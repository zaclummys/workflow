export default class WorkflowCondition {
    constructor ({
        id,
        variableId,
        variableType,
        operator,
        operand,
    }) {
        if (!id) {
            throw new Error('ID is required.')
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!variableType) {
            throw new Error('Variable Type is required.');
        }

        if (!operator) {
            throw new Error('Operator is required.');
        }

        if (!operand) {
            throw new Error('Operand is required.');
        }

        this.id = id;
        this.variableId = variableId;
        this.variableType = variableType;
        this.operator = operator;
        this.operand = operand;
    }

    getId() {
        return this.id;
    }

    getVariableId () {
        return this.variableId;
    }

    getVariableType () {
        return this.variableType;
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