import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from "../../sidebar";

import { OutlineButton } from "../../button";

import VariableForm from "../../variable-form";

export default function ViewVariableWorkflowSidebar ({
    variable,
    onBackButtonClick,
}) {
    return (
        <Sidebar>
            <SidebarTitle>
                Variable
            </SidebarTitle>

            <SidebarContent>
                <VariableForm
                    disabled
                    name={variable.name}
                    type={variable.type}
                    description={variable.description}
                    defaultValue={variable.defaultValue}
                    markedAsInput={variable.markedAsInput}
                    markedAsOutput={variable.markedAsOutput} />
            </SidebarContent>

            <SidebarFooter>
                <OutlineButton
                    onClick={onBackButtonClick}>
                    Back
                </OutlineButton>
            </SidebarFooter>
        </Sidebar>
    );
}