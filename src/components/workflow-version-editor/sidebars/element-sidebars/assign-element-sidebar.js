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
                    return {
                        ...assignment,
                        variableId: event.target.value,
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


    const handleAssignmentValueChange = (event, assignmentId) => {
        setLocalAssignElement(localAssignElement => ({
            ...localAssignElement,
            assignments: localAssignElement.assignments.map(assignment => {
                if (assignment.id === assignmentId) {
                    return {
                        ...assignment,
                        value: event.target.value,
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
        const defaultAssignment = {
            variableId: workflowVersion.variables[0].id,
            operator: 'equal',
            value: '',
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
                            <Row key={assignment.id}>
                                <Field>
                                    <Label>Variable</Label>

                                    <Select
                                        value={assignment.variableId}
                                        onChange={event => handleAssignmentVariableChange(event, assignment.id)}
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
                                        value={assignment.operator}
                                        onChange={event => handleAssignmentOperatorChange(event, assignment.id)}
                                    >
                                        <Option value="equal">
                                            Equal
                                        </Option>

                                        <Option value="increment">
                                            Increment
                                        </Option>

                                        <Option value="decrement">
                                            Decrement
                                        </Option>
                                    </Select>
                                </Field>


                                <Field>
                                    <Label>Value</Label>

                                    <Input
                                        value={assignment.value}
                                        onChange={event => handleAssignmentValueChange(event, assignment.id)}
                                    />
                                </Field>

                                <DestructiveButton
                                    onClick={event => handleRemoveAssignmentButtonClick(event, assignment.id)}>
                                    Remove
                                </DestructiveButton>
                            </Row>
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
