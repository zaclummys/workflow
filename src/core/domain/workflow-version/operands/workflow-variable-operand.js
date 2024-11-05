import WorkflowOperand from '~/core/domain/workflow-version/operands/workflow-operand';

export default class WorkflowVariableOperand extends WorkflowOperand {
    constructor (variableId) {
        super();
        
        if (variableId === undefined || variableId === null) {
            throw new Error('Variable ID cannot be undefined or null.');
        }

        this.variableId = variableId;
    }

    getType () {
        return 'variable';
    }

    getVariableId () {
        return this.variableId;
    }

    evaluate (context) {
        return context.findVariableById(this.variableId);
    }
}
