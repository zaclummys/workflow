import { useId } from 'react';
import { DestructiveButton } from '~/components/button';
import { Field, Label, Select, Option, Row } from '~/components/form';

import ValueFacade from '~/components/value-facade';

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

    return (
        <Row>
            <Field>
                <Label
                    htmlFor={variableId}>
                    Variable
                </Label>

                <Select
                    required
                    id={variableId}
                    value={condition.variableId}
                    onChange={handleConditionVariableChange}
                >
                    {variables.map(variable => (
                        <Option
                            key={variable.id}
                            value={variable.id}
                        >
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
                    onChange={handleConditionOperatorChange}
                >
                    <Option value="equal">
                        Equal
                    </Option>

                    <Option value="not-equal">
                        Not equal
                    </Option>

                    <Option value="greater-than">
                        Greater Than
                    </Option>

                    <Option value="less-than">
                        Less Than
                    </Option>

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

            <DestructiveButton
                onClick={handleRemoveConditionButtonClick}>
                Remove
            </DestructiveButton>
        </Row>
    );
}