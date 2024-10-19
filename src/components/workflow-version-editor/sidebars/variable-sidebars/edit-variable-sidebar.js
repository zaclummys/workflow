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

export default function EditVariableSidebar ({
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
                    type="submit"
                    form={formId}>
                    Apply
                </PrimaryButton>
            </SidebarFooter>
        </Sidebar>
    );
}