import { useId, useState } from 'react';

import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { OutlineButton, PrimaryButton, DestructiveButton } from '~/components/button';
import { Field, Form, Input, Label, TextArea } from '~/components/form';

import Assignment from './assignment';
import { coerceBoolean, coerceNumber } from '~/coerce';

export default function AssignElementSidebar ({
    assignElement,
    variables,

    onConfirm,
    onCancel,

    onRemove,
}) {
    const formId = useId();

    const [localAssignElement, setLocalAssignElement] = useState(assignElement);

    const findVariableById = variableId => {
        return variables.find(variable => variable.id === variableId);
    };

    const findAssignmentById = assignmentId => {
        return localAssignElement.assignments.find(assignment => assignment.id === assignmentId);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const coercedLocalAssignElement = {
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.operand.type === 'value') {
                    const assignmentVariable = findVariableById(assignment.variableId);

                    switch (assignmentVariable.type) {
                        case 'number':
                            return {
                                ...assignment,
                                operand: {
                                    ...assignment.operand,
                                    value: coerceNumber(assignment.operand.value),
                                },
                            };

                        case 'boolean':
                            return {
                                ...assignment,
                                operand: {
                                    ...assignment.operand,
                                    value: coerceBoolean(assignment.operand.value),
                                },
                            };
                        
                        default:
                            return assignment;
                    }
                } else {
                    return assignment;
                }
            }),
        };

        onConfirm(coercedLocalAssignElement);
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
                        variableId: variableId,
                        operator: 'set',
                        operand: {
                            type: 'variable',
                            variableId: variableId,
                        },
                    }
                } else {
                    return assignment;
                }
            }),
        }));
    };

    const handleAssignmentOperatorChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    return {
                        ...assignment,
                        operator: event.target.value,
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
                    const assignmentVariable = findVariableById(assignment.variableId);

                    switch (event.target.value) {
                        case 'variable':
                            return {
                                ...assignment,
                                operand: {
                                    type: 'variable',
                                    variableId: assignment.variableId,
                                },
                            };

                        case 'value':
                            switch (assignmentVariable.type) {
                                case 'string':
                                    return {
                                        ...assignment,
                                        operand: {
                                            type: 'value',
                                            value: '',
                                        },
                                    };

                                case 'number':
                                    return {
                                        ...assignment,
                                        operand: {
                                            type: 'value',
                                            value: '0',
                                        },
                                    };

                                case 'boolean':
                                    return {
                                        ...assignment,
                                        operand: {
                                            type: 'value',
                                            value: 'false',
                                        },
                                    };

                                default:
                                    return assignment;
                            }

                        default:
                            return assignment;
                    }
                    
                } else {
                    return assignment;
                }
            }),
        }));
    };

    const handleAssignmentOperandVariableChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    return {
                        ...assignment,
                        operand: {
                            type: 'variable',
                            variableId: event.target.value,
                        },
                    };
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
                    const assignmentVariable = findVariableById(assignment.variableId);

                    switch (assignmentVariable.type) {
                        case 'string':
                            return {
                                ...assignment,
                                operand: {
                                    ...assignment.operand,
                                    value: event.target.value,
                                },
                            };

                        case 'number':
                            return {
                                ...assignment,
                                operand: {
                                    ...assignment.operand,
                                    value: event.target.value,
                                },
                            };

                        case 'boolean':
                            return {
                                ...assignment,
                                operand: {
                                    ...assignment.operand,
                                    value: event.target.value,
                                },
                            };

                        default:
                            return assignment;
                    }
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
        const firstVariable = variables[0];

        if (firstVariable == null) return;

        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.concat({
                id: crypto.randomUUID(),
                variableId: firstVariable.id,
                operator: 'set',
                operand: {
                    type: 'variable',
                    variableId: firstVariable.id,
                },
            }),
        }));
    };

    const handleRemoveButtonClick = event => {
        onRemove(assignElement.id);
    };

    const nameId = useId();
    const descriptionId = useId();

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Edit Assign
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
                                required
                                id={nameId}
                                value={localAssignElement.name}
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
                                variables={variables}
                                onVariableChange={event => handleAssignmentVariableChange(event, assignment.id)}
                                onOperatorChange={event => handleAssignmentOperatorChange(event, assignment.id)}
                                onOperandTypeChange={event => handleAssignmentOperandTypeChange(event, assignment.id)}
                                onOperandVariableChange={event => handleAssignmentOperandVariableChange(event, assignment.id)}
                                onOperandValueChange={event => handleAssignmentOperandValueChange(event, assignment.id)}
                                onRemoveButtonClick={event => handleRemoveAssignmentButtonClick(event, assignment.id)}
                            />
                        ))}

                        <OutlineButton
                            className="self-start"
                            disabled={variables.length === 0}
                            onClick={handleAddAssignmentButtonClick}>
                            Add assignment
                        </OutlineButton>
                    </Form>
                </SidebarContent>

                <SidebarFooter>
                    <OutlineButton
                        onClick={onCancel}>
                        Cancel
                    </OutlineButton>

                    <PrimaryButton
                        type="submit"
                        form={formId}
                    >
                        Confirm
                    </PrimaryButton>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}

