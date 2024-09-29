'use client';

import {
    useId,
    useState,
} from 'react';

import {
    PrimaryButton,
    OutlineButton,
} from '../../../button';


import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../../../sidebar';

import VariableForm from '../../../variable-form';

export function EditVariableSidebarButton ({
    variable,
    onEditVariable,
}) {
    const [open, setOpen] = useState(false);

    const handleEditButtonClick = () => {
        setOpen(true);
    }

    const handleCancelButtonClick = () => {
        setOpen(false);
    }

    const handleFormSubmit = (event, editedVariable) => {
        setOpen(false);

        onEditVariable(editedVariable);
    }

    return (
        <>
            <OutlineButton
                onClick={handleEditButtonClick}>
                Edit
            </OutlineButton>

            {open && (
                <EditVariableSidebar
                    variable={variable}
                    onFormSubmit={handleFormSubmit}
                    onCancelButtonClick={handleCancelButtonClick}
                />
            )}
        </>
    );
}

export function EditVariableSidebar ({
    variable,
    onFormSubmit,
    onCancelButtonClick,
}) {
    const formId = useId();

    return (
        <Sidebar>
            <SidebarTitle>
                Edit Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    formId={formId}
                    initialValues={variable}
                    onFormSubmit={onFormSubmit}
                />                    
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={onCancelButtonClick}>
                    Cancel
                </OutlineButton>

                <PrimaryButton
                    form={formId}>
                    Save
                </PrimaryButton>
            </SidebarFooter>
        </Sidebar>
    );
}