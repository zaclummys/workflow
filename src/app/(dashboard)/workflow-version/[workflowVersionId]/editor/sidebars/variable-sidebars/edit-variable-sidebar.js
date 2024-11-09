'use client';

import {
    useId,
    useState,
} from 'react';

import {
    PrimaryButton,
    OutlineButton,
} from '~/components/button';


import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import VariableForm from './variable-form';

export default function EditVariableSidebar ({
    variableId,
    onVariableEdited,
    onCancelButtonClick,

    workflowVersion,
    dispatchWorkflowVersion,
}) {
    const variable = workflowVersion.variables.find(variable => variable.id === variableId);

    const formId = useId();

    const handleFormSubmit = (event, editedVariable) => {
        dispatchWorkflowVersion({
            type: 'variable-edited',
            variable: editedVariable,
        });

        onVariableEdited();
    };

    return (
        <Sidebar>
            <SidebarTitle>
                Edit Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    formId={formId}
                    initialValues={variable}
                    onFormSubmit={handleFormSubmit}
                />                    
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    type="submit"
                    form={formId}>
                    Apply
                </PrimaryButton>
            </SidebarFooter>
        </Sidebar>
    );
}