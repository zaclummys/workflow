import { useId, useState } from 'react';

import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../../../sidebar';

import {
    PrimaryButton,
    OutlineButton,
} from '~/components/button';

import VariableForm from '../../../variable-form';

export function AddVariableSidebarButton ({
    onAddVariable
}) {
    const [open, setOpen] = useState(false);

    const handleButtonClick = () => {
        setOpen(true);
    }

    const handleCancelButtonClick = () => {
        setOpen(false);
    }

    const handleFormSubmit = (event, addedVariable) => {
        setOpen(false);

        onAddVariable(addedVariable);
    }

    return (
        <>
            <OutlineButton
                onClick={handleButtonClick}>
                Add
            </OutlineButton>

            {open && (
                <AddVariableSidebar
                    onFormSubmit={handleFormSubmit}
                    onCancelButtonClick={handleCancelButtonClick}
                />
            )}
        </>
    );
}

export function AddVariableSidebar ({
    onFormSubmit,
    onCancelButtonClick,
}) {
    const formId = useId();

    return (
        <Sidebar>
            <SidebarTitle>
                Add Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    formId={formId}
                    onFormSubmit={onFormSubmit}/>
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
