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
