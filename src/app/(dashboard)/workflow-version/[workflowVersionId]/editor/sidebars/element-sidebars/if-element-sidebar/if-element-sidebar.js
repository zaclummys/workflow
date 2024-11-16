'use client';

import { useId, useReducer } from 'react';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { OutlineButton, PrimaryButton } from '~/components/button';
import { Field, Form, Input, Label, Select, Option, TextArea, Row } from '~/components/form';

import IfElementCondition from './if-element-condition';

import { coerceIfElement } from '~/value';
import ifElementReducer from '~/reducers/if-element-sidebar-reducer';

export default function IfElementSidebar ({
    ifElement,
    variables,

    onEdit,
    onCancel,
}) {
    const formId = useId();

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

    const handleAddConditionButtonClick = event => {
        const firstVariable = variables[0];

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

        const coercedIfElement = coerceIfElement(localIfElement);

        onEdit(coercedIfElement);
    };

    const handleCancelButtonClick = event => {
        onCancel();
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
                            <IfElementCondition
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
                        Apply
                    </PrimaryButton>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}

