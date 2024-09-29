import {
    useId,
    useState,
} from 'react';

import {
    Sidebar,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from "../../../sidebar";

import { OutlineButton } from "../../../button";

import VariableForm from "../../../variable-form";

export function ViewVariableSidebarButton ({ variable }) {
    const [open, setOpen] = useState(false);

    const handleViewButtonClick = () => {
        setOpen(false);
    }

    const handleBackButtonClick = () => {
        setOpen(false);
    }

    return (
        <>
            <OutlineButton
                onClick={handleViewButtonClick}
            >
                View
            </OutlineButton>

            {open && (
                <ViewVariableSidebar
                    variable={variable}
                    onBackButtonClick={handleBackButtonClick}
                />
            )}
        </>
    );
}

export function ViewVariableSidebar ({
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