import WorkflowVariableOperand from '~/core/domain/workflow-version/operands/workflow-variable-operand';
import WorkflowValueOperand from '~/core/domain/workflow-version/operands/workflow-value-operand';

export default class WorkflowAssignment {
    static createOperand (operand) {
        switch (operand.type) {
            case 'variable':
                return new WorkflowVariableOperand(operand.variableId);

            case 'value':
                return new WorkflowValueOperand(operand.value);

            default:
                throw new Error(`Unknown operand type: ${operand.type}`);
        }
    }

    constructor({
        id,
        variableId,
        operator,
        operand,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!variableId) {
            throw new Error('Variable ID is required.');
        }

        if (!operator) {
            throw new Error('Operator is required.');
        }

        if (!operand) {
            throw new Error('Operand is required.');
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

    assign (context) {
        context.assignVariable({
            variableId: this.variableId,
            operator: this.operator,
            operand: this.operand,
        });
    }
}



