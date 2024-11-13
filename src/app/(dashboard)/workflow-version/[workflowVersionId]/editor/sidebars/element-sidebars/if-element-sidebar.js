'use client';

import { useId, useReducer, useState } from 'react';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { DestructiveButton, OutlineButton, PrimaryButton } from '~/components/button';
import { Field, Form, Input, Label, Select, Option, TextArea, Row } from '~/components/form';

import ifElementReducer from './if-element-reducer';
import ValueFacade from '~/components/value';

export default function IfSidebar ({
    ifElementId,
    workflowVersion,
    onIfElementedEdited,
    onCloseButtonClick,
    dispatchWorkflowVersion,
}) {
    const findVariableById = variableId => {
        return workflowVersion.variables.find(variable => variable.id === variableId);
    };

    if (ifElementId == null) return null;

    const ifElement = workflowVersion.elements.find(element => element.id === ifElementId);

    if (ifElement == null) return null;

    const formId = useId();

    // const [localIfElement, setLocalIfElement] = useState({
    //     id: ifElement.id,
    //     name: ifElement.name,
    //     description: ifElement.description,
    //     strategy: ifElement.strategy,
    //     conditions: ifElement.conditions,
    // });

    const [localIfElement, dispatchIfElement] = useReducer(ifElementReducer, ifElement);

    const handleNameChange = event => {
        dispatchIfElement({
            type: 'name-changed',
            name: event.target.value,
        });
    };

    const handleDescriptionChange = event => {
        dispatchIfElement({
            type: 'description-changed',
            description: event.target.value,
        });
    };

    const handleStrategyChange = event => {
        dispatchIfElement({
            type: 'strategy-changed',
            strategy: event.target.value,
        });
    };

    const handleConditionVariableChange = (event, conditionId) => {
        const variable = findVariableById(event.target.value);

        if (variable == null) return;

        dispatchIfElement({
            type: 'condition-variable-changed',
            conditionId,
            variableId: variable.id,
            variableType: variable.type,
        });
    };

    const handleConditionOperatorChange = (event, conditionId) => {
        dispatchIfElement({
            type: 'condition-operator-changed',
            conditionId,
            operator: event.target.value,
        });
    };

    const handleConditionOperandTypeChange = (event, conditionId) => {
        dispatchIfElement({
            type: 'condition-operand-type-changed',
            conditionId,
            operandType: event.target.value,
        });
    };

    const handleConditionOperandVariableChange = (event, conditionId) => {
        const variable = findVariableById(event.target.value);

        if (variable == null) return;

        dispatchIfElement({
            type: 'condition-operand-variable-changed',
            conditionId,
            variableId: variable.id,
        });
    };

    const handleConditionOperandValueChange = (event, conditionId) => {
        dispatchIfElement({
            type: 'condition-operand-value-changed',
            conditionId,
            value: event.target.value,
        });
    };

    const handleRemoveConditionButtonClick = (event, conditionId) => {
        dispatchIfElement({
            type: 'condition-removed',
            conditionId,
        });
    };

    const handleAddConditionButtonClick = event => {
        const firstVariable = workflowVersion.variables[0];

        if (firstVariable == null) return;

        dispatchIfElement({
            type: 'condition-added',
            conditionId: crypto.randomUUID(),
            variableId: firstVariable.id,
            variableType: firstVariable.type,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        dispatchWorkflowVersion({
            type: 'element-edited',
            element: localIfElement,
        });

        onIfElementedEdited?.();
    };

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Edit If
                    </SidebarTitle>
                </SidebarHeader>

                <SidebarContent>
                    <Form
                        id={formId}
                        onSubmit={handleSubmit}>
                        <Field>
                            <Label>Name</Label>

                            <Input
                                required
                                value={localIfElement.name}
                                onChange={handleNameChange}
                            />
                        </Field>

                        <Field>
                            <Label>Description</Label>

                            <TextArea
                                value={localIfElement.description}
                                onChange={handleDescriptionChange}
                            />
                        </Field>

                        <span>
                            Conditions
                        </span>

                        <Field>
                            <Label>
                                How conditions should be evaluated?
                            </Label>

                            <Select
                                value={localIfElement.strategy}
                                onChange={handleStrategyChange}>
                                <Option value="all">
                                    All conditions are met
                                </Option>

                                <Option value="any">
                                    Any conditions are met
                                </Option>
                            </Select>
                        </Field>

                        {localIfElement.conditions.map(condition => (
                            <Condition
                                key={condition.id}
                                condition={condition}
                                workflowVersion={workflowVersion}
                                onVariableChange={event => handleConditionVariableChange(event, condition.id)}
                                onOperatorChange={event => handleConditionOperatorChange(event, condition.id)}
                                onOperandTypeChange={event => handleConditionOperandTypeChange(event, condition.id)}
                                onOperandVariableChange={event => handleConditionOperandVariableChange(event, condition.id)}
                                onOperandValueChange={event => handleConditionOperandValueChange(event, condition.id)}
                                onRemoveButtonClick={event => handleRemoveConditionButtonClick(event, condition.id)}
                            />
                        ))}

                        <OutlineButton
                            className="self-start"
                            disabled={workflowVersion.variables.length === 0}
                            onClick={handleAddConditionButtonClick}>
                            Add condition
                        </OutlineButton>
                    </Form>
                </SidebarContent>

                <SidebarFooter>
                    <OutlineButton
                        onClick={onCloseButtonClick}>
                        Close
                    </OutlineButton>

                    <PrimaryButton
                        type="submit"
                        form={formId}
                    >
                        Apply
                    </PrimaryButton>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}

function Condition ({
    condition,
    workflowVersion,

    onVariableChange,
    onOperatorChange,

    onOperandTypeChange,
    onOperandVariableChange,
    onOperandValueChange,

    onRemoveButtonClick,
}) {
    return (
        <Row>
            <Field>
                <Label>Variable</Label>

                <Select
                    value={condition.variableId}
                    onChange={onVariableChange}
                >
                    {workflowVersion.variables.map(variable => (
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
                <Label>Operator</Label>

                <Select
                    value={condition.operator}
                    onChange={onOperatorChange}
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
                <Label>Operand Type</Label>

                <Select
                    value={condition.operand.type}
                    onChange={onOperandTypeChange}>
                    <Option value="variable">Variable</Option>
                    <Option value="value">Value</Option>
                </Select>
            </Field>


            <OperandFacade
                condition={condition}
                workflowVersion={workflowVersion}
                onOperandVariableChange={onOperandVariableChange}
                onOperandValueChange={onOperandValueChange}
            />

            <DestructiveButton
                onClick={onRemoveButtonClick}>
                Remove
            </DestructiveButton>
        </Row>
    );
}

function OperandVariableField ({
    condition,
    workflowVersion,
    onOperandVariableChange,
}) {
    const conditionVariable = workflowVersion.variables.find(variable => variable.id === condition.variableId);

    return (
        <Field>
            <Label>Operand Variable</Label>

            <Select
                value={condition.operand.variableId}
                onChange={onOperandVariableChange}>
                {workflowVersion.variables
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
    );
}

function OperandValueField ({
    condition,
    onOperandValueChange,
}) {
    return (
        <Field>
            <Label>Operand Value</Label>

            <ValueFacade
                value={condition.operand.value}
                onChange={onOperandValueChange}
            />
        </Field>
    );
}

function OperandFacade ({
    condition,
    workflowVersion,
    onOperandVariableChange,
    onOperandValueChange,
}) {
    if (condition == null) return null;

    switch (condition.operand.type) {
        case 'variable':
            return (
                <OperandVariableField
                    condition={condition}
                    workflowVersion={workflowVersion}
                    onOperandVariableChange={onOperandVariableChange}
                />
            );

        case 'value':
            return (
                <OperandValueField
                    condition={condition}
                    onOperandValueChange={onOperandValueChange}
                />
            );

        default:
            throw new Error(`Unsupported operand type: ${operand.type}`);
    }
}