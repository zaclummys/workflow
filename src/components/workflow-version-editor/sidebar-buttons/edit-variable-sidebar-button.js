import { useState } from 'react';

import { OutlineButton } from '~/components/button';
import EditVariableSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/edit-variable-sidebar';

export default function EditVariableSidebarButton ({
    variable,
    dispatchWorkflowVersion,
}) {
    const [open, setOpen] = useState(false);

    const handleEditButtonClick = () => {
        setOpen(true);
    }

    const handleCancelButtonClick = () => {
        setOpen(false);
    }

    const handleFormSubmit = (event, editedVariable) => {
        event.preventDefault();
        
        dispatchWorkflowVersion({
            type: 'variable-edited',
            variable: editedVariable,
        });

        setOpen(false);
    }

    return (
        <>
            <OutlineButton
                onClick={handleEditButtonClick}>
                Edit
            </OutlineButton>

            {open && (
                <EditVariableSidebar
                    variable={variable}
                    onFormSubmit={handleFormSubmit}
                    onCancelButtonClick={handleCancelButtonClick}
                />
            )}
        </>
    );
}