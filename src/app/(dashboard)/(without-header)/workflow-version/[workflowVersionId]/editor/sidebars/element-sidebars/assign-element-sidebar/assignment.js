import { useId } from 'react';
import { Field, Label, Select, Option } from '~/components/form';

import { OutlineDestructiveButton } from '~/components/button';
import ValueFacade from '~/components/value-facade';

import { assignmentOperators } from '~/core/domain/workflow-version/operators/assignment-operators';

import { Trash } from '~/components/icon';

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

    if (!assignmentVariable) {
        return (
            <div className="flex flex-row items-center">
                <p className="flex-auto text-red-400">
                    Assignment variable `{assignment.variableId}` does not exist anymore.
                </p>

                <RemoveAssignmentButton
                    onClick={onRemoveButtonClick} />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-assignment gap-2 items-end">
            <Field>
                <Label
                    htmlFor={variableId}>
                    Variable (Target)
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
                        Operand Variable (Source)
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
                        Operand Value (Source)
                    </Label>

                    <ValueFacade
                        id={operandValueId}
                        type={assignmentVariable.type}
                        value={assignment.operand.value}
                        onChange={onOperandValueChange}
                    />
                </Field>
            )}

            <RemoveAssignmentButton
                onClick={onRemoveButtonClick} />
        </div>
    )
}

function RemoveAssignmentButton ({ onClick }) {
    return (
        <OutlineDestructiveButton
            title="Remove assignment"
            onClick={onClick}>
            <Trash className="w-4 h-4" />
        </OutlineDestructiveButton>
    );
}