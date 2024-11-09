import { useId } from 'react';

import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import {
    PrimaryButton,
    OutlineButton,
} from '~/components/button';

import VariableForm from './variable-form';

export default function AddVariableSidebar ({
    onVariableAdded,
    onCancelButtonClick,
    dispatchWorkflowVersion,
}) {
    const formId = useId();

    const handleFormSubmit = (event, addedVariable) => {
        dispatchWorkflowVersion({
            type: 'variable-added',
            variable: {
                ...addedVariable,
                id: crypto.randomUUID(),
            },
        });

        onVariableAdded();
    };

    return (
        <Sidebar>
            <SidebarTitle>
                Add Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    formId={formId}
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
                    Confirm
                </PrimaryButton>
            </SidebarFooter>
        </Sidebar>
    );
}
