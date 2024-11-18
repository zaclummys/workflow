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
        this.operand = WorkflowAssignment.createOperand(operand);
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
        const operandValue = this.operand.evaluate(context);

        const variable = context.findVariableById(this.variableId);

        switch (this.operator) {
            case 'set':
                variable.set(operandValue);
            break;

            case 'increment':
                variable.increment(operandValue);
            break;

            case 'decrement':
                variable.decrement(operandValue);
            break;

            default:
                throw new Error(`Unknown operator: ${this.operator}`);
        }
    }
}



