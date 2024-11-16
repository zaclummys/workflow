import {
    Sidebar,
    SidebarHeader,
    SidebarTitle,
    SidebarContent,
    SidebarFooter,
} from '~/components/sidebar';

import { OutlineButton } from '~/components/button';

import ButtonGroup from '~/components/button-group';

export default function ShowVariablesSidebar ({
    variables,
    onAddVariableButtonClick,
    onEditVariableButtonClick,
    onRemoveVariableButtonClick,
    onCloseButtonClick,
}) {
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTitle>
                        Variables
                    </SidebarTitle>

                    <OutlineButton
                        onClick={onAddVariableButtonClick}>
                            Add
                    </OutlineButton>
                </SidebarHeader>

                <SidebarContent>
                    <div className="flex flex-col gap-2">
                        {variables.map((variable) => (
                           <Variable
                                key={variable.id}
                                variable={variable}
                                onEditButtonClick={onEditVariableButtonClick}
                                onRemoveButtonClick={onRemoveVariableButtonClick}
                            />
                        ))}
                    </div>
                </SidebarContent>

                <SidebarFooter>
                    <OutlineButton
                        onClick={onCloseButtonClick}>
                        Close
                    </OutlineButton>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}

function Variable ({
    variable,
    onEditButtonClick,
    onRemoveButtonClick,
}) {
    return (
        <div className="flex flex-row justify-between items-center">
            <span>{variable.name}</span>

            <ButtonGroup>
                <OutlineButton
                    onClick={event => onEditButtonClick(event, variable)}>
                    Edit
                </OutlineButton>

                <OutlineButton
                    onClick={event => onRemoveButtonClick(event, variable)}>
                    Remove
                </OutlineButton>
            </ButtonGroup>
        </div>
    );
}