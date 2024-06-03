import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '../sidebar';

import VariableForm from '../variable-form';

export default function AddVariableWorkflowSidebar ({
    formId,
    onCancelButtonClick,
}) {
    return (
        <Sidebar>
            <SidebarTitle>
                Add Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm />
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