import { useState } from 'react';

import { OutlineButton } from '~/components/button';
import AddVariableSidebar from "~/components/workflow-version-editor/sidebars/variable-sidebars/add-variable-sidebar";

export default function AddVariableSidebarButton ({
    dispatchWorkflowVersion
}) {
    const [open, setOpen] = useState(false);

    const handleButtonClick = () => {
        setOpen(true);
    }

    const handleCancelButtonClick = () => {
        setOpen(false);
    }

    const handleFormSubmit = (event, addedVariable) => {
        event.preventDefault();

        dispatchWorkflowVersion({
            type: 'variable-added',
            variable: {
                ...addedVariable,
                id: crypto.randomUUID(),
            },
        });

        setOpen(false);
    }

    return (
        <div>
            <OutlineButton
                onClick={handleButtonClick}>
                Add
            </OutlineButton>

            {open && (
                <AddVariableSidebar
                    onFormSubmit={handleFormSubmit}
                    onCancelButtonClick={handleCancelButtonClick}
                    dispatchWorkflowVersion={dispatchWorkflowVersion}
                />
            )}
        </div>
    );
}