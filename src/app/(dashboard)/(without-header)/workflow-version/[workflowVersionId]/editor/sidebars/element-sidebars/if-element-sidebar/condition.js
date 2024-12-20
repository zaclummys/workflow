import { useId } from 'react';
import { OutlineDestructiveButton } from '~/components/button';
import { Field, Label, Select, Option } from '~/components/form';

import ValueFacade from '~/components/value-facade';

import { comparisonOperators } from '~/core/domain/workflow-version/operators/comparison-operators';

import { Trash } from '~/components/icon';

export default function Condition ({
    condition,
    variables,
    dispatchIfElement,
}) {
    const findVariableById = variableId => {
        return variables.find(variable => variable.id === variableId);
    };
    
    const conditionVariable = findVariableById(condition.variableId);

    const handleConditionVariableChange = (event) => {
        const variable = findVariableById(event.target.value);

        if (variable == null) {
            return;
        }

        dispatchIfElement({
            type: 'condition-variable-changed',
            conditionId: condition.id,
            variableId: variable.id,
        });
    };

    const handleConditionOperatorChange = (event) => {
        dispatchIfElement({
            type: 'condition-operator-changed',
            conditionId: condition.id,
            operator: event.target.value,
        });
    };

    const handleConditionOperandTypeChange = (event) => {
        dispatchIfElement({
            type: 'condition-operand-type-changed',
            conditionId: condition.id,
            variableType: conditionVariable.type,
            operandType: event.target.value,
        });
    };

    const handleConditionOperandVariableChange = (event) => {
        const variable = findVariableById(event.target.value);

        if (variable == null) return;

        dispatchIfElement({
            type: 'condition-operand-variable-changed',
            conditionId: condition.id,
            operandVariableId: variable.id,
        });
    };

    const handleConditionOperandValueChange = (event) => {
        dispatchIfElement({
            type: 'condition-operand-value-changed',
            conditionId: condition.id,
            value: event.target.value,
        });
    };

    const handleRemoveConditionButtonClick = (event) => {
        dispatchIfElement({
            type: 'condition-removed',
            conditionId: condition.id,
        });
    };

    const variableId = useId();
    const operatorId = useId();
    const operandTypeId = useId();
    const operandVariableId = useId();
    const operandValueId = useId();

    if (!conditionVariable) {
        return (
            <div className="flex flex-row items-center">
                <p className="flex-auto text-red-400">
                    Condition variable `{condition.variableId}` does not exist anymore.
                </p>

                <RemoveConditionButton
                    onClick={handleRemoveConditionButtonClick} />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-condition gap-2 items-end">
            <Field>
                <Label
                    htmlFor={variableId}>
                    Variable
                </Label>

                <Select
                    required
                    id={variableId}
                    value={condition.variableId}
                    onChange={handleConditionVariableChange}>
                    {variables.map(variable => (
                        <Option
                            key={variable.id}
                            value={variable.id}>
                            {variable.name}
                        </Option>
                    ))}
                </Select>
            </Field>

            <Field>
                <Label
                    htmlFor={operatorId}>
                    Operator
                </Label>

                <Select
                    required
                    id={operatorId}
                    value={condition.operator}
                    onChange={handleConditionOperatorChange}>
                    {comparisonOperators
                        .filter(comparisonOperator => comparisonOperator.supports.includes(conditionVariable.type))
                        .map(comparisonOperator => (
                            <Option
                                key={comparisonOperator.name}
                                value={comparisonOperator.name}>
                                {comparisonOperator.label}
                            </Option>
                        ))}
                </Select>
            </Field>

            <Field>
                <Label
                    htmlFor={operandTypeId}>
                    Operand Type
                </Label>

                <Select
                    required
                    id={operandTypeId}
                    value={condition.operand.type}
                    onChange={handleConditionOperandTypeChange}>
                    <Option value="variable">Variable</Option>
                    <Option value="value">Value</Option>
                </Select>
            </Field>

            {condition.operand.type === 'variable' && (
                <Field>
                    <Label
                        htmlFor={operandVariableId}>
                        Operand Variable
                    </Label>
        
                    <Select
                        required
                        id={operandVariableId}
                        value={condition.operand.variableId}
                        onChange={handleConditionOperandVariableChange}>
                        {variables
                            .filter(variable => variable.type === conditionVariable.type)
                            .map(variable => (
                                <Option
                                    key={variable.id}
                                    value={variable.id}>
                                    {variable.name}
                                </Option>
                            ))}
                    </Select>
                </Field>
            )}

            {condition.operand.type === 'value' && (
                <Field>
                    <Label
                        htmlFor={operandValueId}>
                        Operand Value
                    </Label>
        
                    <ValueFacade
                        id={operandValueId}
                        type={conditionVariable.type}
                        value={condition.operand.value}
                        onChange={handleConditionOperandValueChange}
                    />
                </Field>
            )}

            <RemoveConditionButton
                onClick={handleRemoveConditionButtonClick} />
        </div>
    );
}

function RemoveConditionButton ({ onClick }) {
    return (
        <OutlineDestructiveButton
            title="Remove condition"
            onClick={onClick}>
            <Trash className="w-4 h-4" />
        </OutlineDestructiveButton>
    );
}