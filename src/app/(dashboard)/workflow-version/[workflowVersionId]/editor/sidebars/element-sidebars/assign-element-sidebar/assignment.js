import { useId } from 'react';
import { Field, Label, Select, Option } from '~/components/form';

import { DestructiveButton } from '~/components/button';
import ValueFacade from '~/components/value-facade';

import assignmentOperators from './assignment-operators';

export default function Assignment ({
    assignment,
    variables,

    onVariableChange,
    onOperatorChange,
    onOperandTypeChange,
    onOperandVariableChange,
    onOperandValueChange,

    onRemoveButtonClick,
}) {
    const assignmentVariable = variables.find(variable => variable.id === assignment.variableId);

    const variableId = useId();
    const operatorId = useId();
    const operandTypeId = useId();
    const operandVariableId = useId();
    const operandValueId = useId();

    return (
        <div
            className="grid gap-2 items-end"
            style={{
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr)) min-content',
            }}>
            <Field>
                <Label
                    htmlFor={variableId}>
                    Variable
                </Label>

                <Select
                    id={variableId}
                    value={assignment.variableId}
                    onChange={onVariableChange}>
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
                    value={assignment.operator}
                    onChange={onOperatorChange}
                >
                    {assignmentOperators
                        .filter(assignmentOperator => assignmentOperator.supports.includes(assignmentVariable.type))
                        .map(assignmentOperator => (
                            <Option
                                key={assignmentOperator.name}
                                value={assignmentOperator.name}>
                                {assignmentOperator.label}
                            </Option>
                        ))
                    }
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
                    value={assignment.operand.type}
                    onChange={onOperandTypeChange}>
                    <Option value="variable">Variable</Option>
                    <Option value="value">Value</Option>
                </Select>
            </Field>

            {assignment.operand.type === 'variable' && (
                <Field>
                    <Label
                        htmlFor={operandVariableId}>
                        Operand Variable
                    </Label>

                    <Select
                        id={operandVariableId}
                        value={assignment.operand.variableId}
                        onChange={onOperandVariableChange}>
                        {variables.map(variable => (
                            <Option
                                key={variable.id}
                                value={variable.id}>
                                {variable.name}
                            </Option>
                        ))}
                    </Select>
                </Field>
            )}

            {assignment.operand.type === 'value' && (
                <Field>
                    <Label
                        htmlFor={operandValueId}>
                        Operand Value
                    </Label>

                    <ValueFacade
                        id={operandValueId}
                        type={assignmentVariable.type}
                        value={assignment.operand.value}
                        onChange={onOperandValueChange}
                    />
                </Field>
            )}

            <DestructiveButton
                onClick={onRemoveButtonClick}>
                Remove
            </DestructiveButton>
        </div>
    )
}