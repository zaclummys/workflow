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

const assignmentTypes = [
    {
        name: 'set',
        label: 'Set',
        supportedVariableTypes: ['string', 'number', 'boolean'],
    },

    {
        name: 'add',
        label: 'Add',
        supportedVariableTypes: ['number'],
    },

    {
        name: 'subtract',
        label: 'Subtract',
        supportedVariableTypes: ['number'],
    },

    {
        name: 'multiply',
        label: 'Multiply',
        supportedVariableTypes: ['number'],
    },

    {
        name: 'divide',
        label: 'Divide',
        supportedVariableTypes: ['number'],
    },
];

const findAllSupportedAssignmentTypes = (variableType) => {
    return assignmentTypes.filter(assignmentType => {
        return assignmentType.supportedVariableTypes.includes(variableType);
    });
};

export default function AssignSidebar ({
    assignElementId,
    workflowVersion,
    onCloseButtonClick,
    onAssignElementEdited,
    dispatchWorkflowVersion,
}) {
    const assignElement = workflowVersion.elements.find(element => element.id === assignElementId);

    const formId = useId();

    const [localAssignElement, setLocalAssignElement] = useState({
        id: assignElement.id,
        name: assignElement.name,
        description: assignElement.description,
        strategy: assignElement.strategy,
        assignments: assignElement.assignments,
    });

    const findVariableById = variableId => {
        return workflowVersion.variables.find(variable => variable.id === variableId);
    };

    const handleNameChange = event => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            name: event.target.value,
        }));
    };

    const handleDescriptionChange = event => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            description: event.target.value,
        }));
    };

    const handleAssignmentVariableChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    const variableId = event.target.value;

                    return {
                        ...assignment,
                        variableId,
                        type: 'set',
                        value: '',
                    }
                } else {
                    return assignment;
                }
            }),
        }));
    };

    const handleAssignmentTypeChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    return {
                        ...assignment,
                        type: event.target.value,
                    }
                } else {
                    return assignment;
                }
            }),
        }));
    };

    const handleAssignmentOperandTypeChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    switch (event.target.value) {}
                    return {
                        ...assignment,
                        operand: {
                            type: event.target.value,
                            value: '',
                        },
                    }
                } else {
                    return assignment;
                }
            }),
        }));
    };

    const handleAssignmentOperandValueChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    return {
                        ...assignment,
                        operand: {
                            ...assignment.operand,
                            value: event.target.value,
                        }
                    };
                } else {
                    return assignment;
                }
            }),
        }));
    };

    const handleRemoveAssignmentButtonClick = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.filter(assignment => {
                return assignment.id !== assignmentId;
            }),
        }));
    };

    const handleAddAssignmentButtonClick = event => {
        const defaultAssignment = {
            variableId: workflowVersion.variables[0].id,
            type: 'set',
            operand: {
                type: 'variable',
                value: '',
            }
        };

        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.concat({
                ...defaultAssignment,
                id: crypto.randomUUID(),
            }),
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        dispatchWorkflowVersion({
            type: 'element-edited',
            element: localAssignElement,
        });

        onAssignElementEdited?.();
    };

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Edit Assign
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
                                value={localAssignElement.name}
                                onChange={handleNameChange}
                            />
                        </Field>

                        <Field>
                            <Label>Description</Label>

                            <TextArea
                                value={localAssignElement.description}
                                onChange={handleDescriptionChange}
                            />
                        </Field>

                        <span>
                            Assignments
                        </span>

                        {localAssignElement.assignments.map(assignment => (
                            <Assignment
                                key={assignment.id}
                                assignment={assignment}
                                workflowVersion={workflowVersion}
                                onVariableChange={event => handleAssignmentVariableChange(event, assignment.id)}
                                onTypeChange={event => handleAssignmentTypeChange(event, assignment.id)}
                                onOperandTypeChange={event => handleAssignmentOperandTypeChange(event, assignment.id)}
                                onOperandValueChange={event => handleAssignmentOperandValueChange(event, assignment.id)}
                                onRemoveButtonClick={event => handleRemoveAssignmentButtonClick(event, assignment.id)}
                            />
                        ))}

                        <OutlineButton
                            className="self-start"
                            disabled={workflowVersion.variables.length === 0}
                            onClick={handleAddAssignmentButtonClick}>
                            Add assignment
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

function Assignment ({
    assignment,
    workflowVersion,

    onVariableChange,
    onTypeChange,
    onOperandTypeChange,
    onOperandValueChange,

    onRemoveButtonClick,
}) {
    const variable = workflowVersion.variables.find(variable => variable.id === assignment.variableId);

    const supportedAssignmentTypes = assignmentTypes.filter(assignmentType => {
        return assignmentType.supportedVariableTypes.includes(variable.type);
    });

    return (
        <Row>
            <Field>
                <Label>Variable</Label>

                <Select
                    value={assignment.variableId}
                    onChange={onVariableChange}>
                    {workflowVersion.variables.map(variable => (
                        <Option
                            key={variable.id}
                            value={variable.id}>
                            {variable.name}
                        </Option>
                    ))}
                </Select>
            </Field>

            <Field>
                <Label>Type</Label>

                <Select
                    required
                    value={assignment.type}
                    onChange={onTypeChange}
                >
                    {supportedAssignmentTypes.map(assignmentType => (
                        <Option
                            key={assignmentType.name}
                            value={assignmentType.name}>
                            {assignmentType.label}
                        </Option>
                    ))}
                </Select>
            </Field>

            <Field>
                <Label>Operand Type</Label>

                <Select onChange={onOperandTypeChange}>
                    <Option value="variable">Variable</Option>
                    <Option value="value">Value</Option>
                </Select>
            </Field>

            {assignment.operand.type === 'variable' && (
                <Field>
                    <Label>Operand Variable</Label>

                    <Select
                        value={assignment.operand.value}
                        onChange={onOperandValueChange}>
                        {workflowVersion.variables.map(variable => (
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
                    <Label>Operand Value</Label>

                    <Input
                        value={assignment.operand.value}
                        onChange={onOperandValueChange}
                    />
                </Field>
            )}

            <DestructiveButton
                onClick={onRemoveButtonClick}>
                Remove
            </DestructiveButton>
        </Row>
    )
}