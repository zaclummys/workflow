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

import VariableForm from '~/components/variable-form';

export default function AddVariableSidebar ({
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
                    Confirm
                </PrimaryButton>
            </SidebarFooter>
        </Sidebar>
    );
}
