export const ASSIGNMENT_OPERATOR_SET = 'set';
export const ASSIGNMENT_OPERATOR_NUMBER_INCREMENT = 'increment';
export const ASSIGNMENT_OPERATOR_NUMBER_DECREMENT = 'decrement';
export const ASSIGNMENT_OPERATOR_NUMBER_MULTIPLY = 'multiply';
export const ASSIGNMENT_OPERATOR_NUMBER_DIVIDE = 'divide';

export const COMPARISON_OPERATOR_EQUAL = 'equal';
export const COMPARISON_OPERATOR_NUMBER_GREATER_THAN = 'greater-than';
export const COMPARISON_OPERATOR_NUMBER_LESS_THAN = 'less-than';

export default class WorkflowExecutionContext {
    constructor ({ variables }) { 
        this.variables = variables.map(variable => new WorkflowVersionRuntimeVariable(variable));
    }

    findVariableById (variableId) {
        const variable = this.variables.find(variable => variableId === variable.getId());

        if (variable == null) {
            throw new Error(`Variable ${variableId} not found.`);
        }

        return variable;
    }

    evaluateOperand (operand) {
        switch (operand.type) {
            case 'value':
                return operand.value;

            case 'variable':
                const variable = this.findVariableById(operand.variableId);

                return variable.getValue();

            default:
                throw new Error(`Unknown operand type: ${operand.type}`);
        }
    }

    assignVariable ({
        variableId,
        operator,
        operand,
    }) {
        const variable = this.findVariableById(variableId);
        const value = this.evaluateOperand(operand);

        variable.assign(operator, value);
    }

    compareVariable ({
        variableId,
        operator,
        operand,
    }) {
        const variable = this.findVariableById(variableId);
        const value = this.evaluateOperand(operand);

        return variable.compare(operator, value);
    }

    getVariables () {
        return this.variables;
    }

    getOutputVariables () {
        return this.variables
            .filter(variable => variable.getMarkedAsOutput())
            .map(variable => ({
                id: variable.getId(),
                type: variable.getType(),
                value: variable.getValue(),
            }));
    }
}

export class WorkflowVersionRuntimeVariable {
    constructor ({
        id,
        type,
        value,
        markedAsOutput = false,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!type) {
            throw new Error('Type is required.');
        }

        if (value == null) {
            throw new Error('Value cannot be null.');
        }

        if (markedAsOutput == null) {
            throw new Error('Marked as output cannot be null.');
        }

        this.id = id;
        this.type = type;
        this.value = value;
        this.markedAsOutput = markedAsOutput;
    }

    getId () {
        return this.id;
    }

    getType () {
        return this.type;
    }

    getValue () {
        return this.value;
    }

    getMarkedAsOutput () {
        return this.markedAsOutput;
    }

    assign (operator, other) {
        switch (operator) {
            case ASSIGNMENT_OPERATOR_SET:
                this.value = other;
            break;
    
            case ASSIGNMENT_OPERATOR_NUMBER_INCREMENT:
                this.value += other;
            break;
    
            case ASSIGNMENT_OPERATOR_NUMBER_DECREMENT:
                this.value -= other;
            break;

            case ASSIGNMENT_OPERATOR_NUMBER_MULTIPLY:
                this.value *= other;
            break;

            case ASSIGNMENT_OPERATOR_NUMBER_DIVIDE:
                this.value /= other;
            break;
    
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }
    
    compare (operator, other) {
        switch (operator) {
            case COMPARISON_OPERATOR_EQUAL:
                return this.value === other;
    
            case COMPARISON_OPERATOR_NUMBER_GREATER_THAN:
                return this.value > other;
    
            case COMPARISON_OPERATOR_NUMBER_LESS_THAN:
                return this.value < other;
    
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }
}