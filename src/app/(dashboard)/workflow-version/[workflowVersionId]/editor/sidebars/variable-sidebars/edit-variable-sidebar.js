import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
} from '~/components/sidebar';

import VariableForm from './variable-form';

export default function EditVariableSidebar ({
    variable,
    onConfirm,
    onCancel,
}) {
    return (
        <Sidebar>
            <SidebarTitle>
                Edit Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    variable={variable}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />                    
            </SidebarContent>
        </Sidebar>
    );
}