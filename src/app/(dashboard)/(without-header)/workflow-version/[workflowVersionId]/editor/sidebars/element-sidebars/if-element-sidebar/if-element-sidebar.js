'use client';

import { useId, useReducer } from 'react';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { DestructiveButton, OutlineButton, PrimaryButton } from '~/components/button';
import { Field, Form, Input, Label, Select, Option, TextArea, Row } from '~/components/form';

import Condition from './condition';

import ifElementReducer from './if-element-sidebar-reducer';
import {coerceBoolean, coerceNumber} from "~/coerce";

export default function IfElementSidebar ({
    ifElement,
    variables,

    onConfirm,
    onCancel,
    
    onRemove,
}) {
    const formId = useId();

    const [localIfElement, dispatchIfElement] = useReducer(ifElementReducer, ifElement);

    const handleSubmit = event => {
        event.preventDefault();
        
        function coerceIfElement (ifElement) {
            return {
                ...ifElement,
                conditions: ifElement.conditions.map(condition => {
                    if (condition.operand.type === 'value') {
                        const conditionVariable = variables.find(variable => variable.id === condition.variableId);
                        
                        switch (conditionVariable.type) {
                            case 'number':
                                return {
                                    ...condition,
                                    operand: {
                                        ...condition.operand,
                                        value: coerceNumber(condition.operand.value),
                                    }
                                };
                            
                            case 'boolean':
                                return {
                                    ...condition,
                                    operand: {
                                        ...condition.operand,
                                        value: coerceBoolean(condition.operand.value),
                                    }
                                };
                            
                            default:
                                return condition;
                        }
                    } else {
                        return condition;
                    }
                }),
            }
        }
        
        const coercedLocalIfElement = coerceIfElement(localIfElement);

        onConfirm(coercedLocalIfElement);
    };

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

    const handleAddConditionButtonClick = event => {
        const firstVariable = variables[0];

        if (firstVariable == null) return;

        dispatchIfElement({
            type: 'condition-added',
            conditionId: crypto.randomUUID(),
            variableId: firstVariable.id,
        });
    };

    const handleCancelButtonClick = event => {
        onCancel();
    };

    const handleRemoveButtonClick = event => {
        onRemove(ifElement.id);
    };

    const nameId = useId();
    const descriptionId = useId();
    const strategyId = useId();

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Edit If
                    </SidebarTitle>

                    <DestructiveButton
                        onClick={handleRemoveButtonClick}>
                        Remove
                    </DestructiveButton>
                </SidebarHeader>

                <SidebarContent>
                    <Form
                        id={formId}
                        onSubmit={handleSubmit}>
                        <Field>
                            <Label
                                htmlFor={nameId}>
                                Name
                            </Label>

                            <Input
                                id={nameId}
                                required
                                value={localIfElement.name}
                                onChange={handleNameChange}
                            />
                        </Field>

                        <Field>
                            <Label
                                htmlFor={descriptionId}>
                                    Description
                                </Label>

                            <TextArea
                                id={descriptionId}
                                value={localIfElement.description}
                                onChange={handleDescriptionChange}
                            />
                        </Field>

                        <span>
                            Conditions
                        </span>

                        <Field>
                            <Label
                                htmlFor={strategyId}>
                                Strategy
                            </Label>

                            <span>
                                How conditions should be evaluated?
                            </span>

                            <Select
                                id={strategyId}
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
                                variables={variables}
                                dispatchIfElement={dispatchIfElement}
                            />
                        ))}

                        <OutlineButton
                            className="self-start"
                            disabled={variables.length === 0}
                            onClick={handleAddConditionButtonClick}>
                            Add condition
                        </OutlineButton>
                    </Form>
                </SidebarContent>

                <SidebarFooter>
                    <OutlineButton
                        onClick={handleCancelButtonClick}>
                        Cancel
                    </OutlineButton>

                    <PrimaryButton
                        type="submit"
                        form={formId}>
                        Confirm
                    </PrimaryButton>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}