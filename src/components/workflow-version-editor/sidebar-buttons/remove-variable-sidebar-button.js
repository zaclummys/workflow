import { useState } from 'react';

import { OutlineButton } from '~/components/button';

import RemoveVariableSidebar from '~/components/workflow-version-editor/sidebars/variable-sidebars/remove-variable-sidebar';

export default function RemoveVariableSidebarButton ({
    variable,
}) {
    const [open, setOpen] = useState(false);

    const handleButtonClick = () => {
        setOpen(true);
    }

    const handleCancelButtonClick = () => {
        setOpen(false);
    }

    const handleConfirmButtonClick = () => {
        setOpen(false);

        dispatchWorkflowVersion({
            type: 'variable-removed',
            variableId: variable.id,
        });
    }

    return (
        <>
            <OutlineButton
                onClick={handleButtonClick}>
                Remove
            </OutlineButton>

            {open && (
                <RemoveVariableSidebar
                    variable={variable}
                    onConfirmButtonClick={handleConfirmButtonClick}
                    onCancelButtonClick={handleCancelButtonClick}
                />
            )}
        </>
    );
}