import WorkflowOperand from '~/core/domain/workflow-version/operands/workflow-operand';

import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';
import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';
import WorkflowBooleanValue from '~/core/domain/workflow-version/values/workflow-boolean-value';

export default class WorkflowValueOperand extends WorkflowOperand {
    static createValue (value) {
        if (value === undefined || value === null) {
            throw new Error('Value cannot be undefined or null.');
        }

        switch (value.type) {
            case 'number':
                return new WorkflowNumberValue(value.number);

            case 'boolean':
                return new WorkflowBooleanValue(value.boolean);

            case 'string':
                return new WorkflowStringValue(value.string);

            default:
                throw new Error(`Unknown value type: ${value.type}`);
        }
    }

    constructor (value) {
        super();

        this.value = WorkflowValueOperand.createValue(value);
    }

    getType () {
        return 'value';
    }

    getValue () {
        return this.value;
    }

    evaluate (context) {
        return this.value;
    }
}