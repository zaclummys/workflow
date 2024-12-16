import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
} from '~/components/sidebar';

import VariableForm from './variable-form';

export default function AddVariableSidebar ({
    onConfirm,
    onCancel,
}) {
    return (
        <Sidebar>
            <SidebarTitle>
                Add Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />
            </SidebarContent>
        </Sidebar>
    );
}
