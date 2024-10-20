'use client';

import { useId, useState } from 'react';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { DestructiveButton, OutlineButton, PrimaryButton } from '~/components/button';
import { Field, Form, Input, Label, Select, Option, TextArea, Row } from '~/components/form';

export default function IfSidebar ({
    ifElementId,
    workflowVersion,
    onIfElementedEdited,
    onCloseButtonClick,
    dispatchWorkflowVersion,
}) {
    const ifElement = workflowVersion.elements.find(element => element.id === ifElementId);

    const formId = useId();

    const [localIfElement, setLocalIfElement] = useState({
        id: ifElement.id,
        name: ifElement.name,
        description: ifElement.description,
        strategy: ifElement.strategy,
        conditions: ifElement.conditions,
    });

    const handleNameChange = event => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            name: event.target.value,
        }));
    };

    const handleDescriptionChange = event => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            description: event.target.value,
        }));
    };

    const handleStrategyChange = event => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            strategy: event.target.value,
        }));
    };

    const handleConditionVariableChange = (event, conditionId) => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            conditions: localIfElement.conditions.map(condition => {
                if (condition.id === conditionId) {
                    return {
                        ...condition,
                        variableId: event.target.value,
                    }
                } else {
                    return condition;
                }
            }),
        }));
    };

    const handleConditionOperatorChange = (event, conditionId) => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            conditions: localIfElement.conditions.map(condition => {
                if (condition.id === conditionId) {
                    return {
                        ...condition,
                        operator: event.target.value,
                    }
                } else {
                    return condition;
                }
            }),
        }));
    };

    const handleConditionValueChange = (event, conditionId) => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            conditions: localIfElement.conditions.map(condition => {
                if (condition.id === conditionId) {
                    return {
                        ...condition,
                        value: event.target.value,
                    }
                } else {
                    return condition;
                }
            }),
        }));
    };


    const handleRemoveConditionButtonClick = (event, conditionId) => {
        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            conditions: localIfElement.conditions.filter(condition => {
                return condition.id !== conditionId;
            }),
        }));
    };

    const handleAddConditionButtonClick = event => {
        const defaultCondition = {
            variableId: workflowVersion.variables[0].id,
            operator: 'equal',
            value: '',
        };

        setLocalIfElement(localIfElement => ({
            ...localIfElement,
            conditions: localIfElement.conditions.concat({
                ...defaultCondition,
                id: crypto.randomUUID(),
            }),
        }));
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
                            <Row key={condition.id}>
                                <Field>
                                    <Label>Variable</Label>

                                    <Select
                                        value={condition.variableId}
                                        onChange={event => handleConditionVariableChange(event, condition.id)}
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
                                        onChange={event => handleConditionOperatorChange(event, condition.id)}
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
                                    <Label>Value</Label>

                                    <Input
                                        value={condition.value}
                                        onChange={event => handleConditionValueChange(event, condition.id)}
                                    />
                                </Field>

                                <DestructiveButton
                                    onClick={event => handleRemoveConditionButtonClick(event, condition.id)}>
                                    Remove
                                </DestructiveButton>
                            </Row>
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
