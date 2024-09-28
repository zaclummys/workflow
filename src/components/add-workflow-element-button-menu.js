import { CirclePlus, Split, Equal, CircleX } from 'lucide-react';

import { useState } from 'react';
import { Menu, MenuItem } from '~/components/menu';

import addElementToWorkflowVersion from '~/actions/add-element-to-workflow-version-action';

export default function AddWorkflowElementButtonMenu ({
    previousElementId,
    previousElementBranch,
    workflowVersionId,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleOpenButtonClick = () => {
        setIsOpen(true);
    };

    const handleCloseButtonClick = () => {
        setIsOpen(false);
    };

    const handleAddElementMenuItemClick = async (event) => {
        setIsPending(true);

        const { elementType } =event.currentTarget.dataset;
        
        try {
            const { success, message } = await addElementToWorkflowVersion({
                elementType,
                previousElementId,
                previousElementBranch,
                workflowVersionId,
            });

            if (success) {
                setIsOpen(false);
            } else {
                alert(message)
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="p-4 flex flex-col items-center gap-4">
            {isOpen ? (
                <>
                    <CircleX
                        className="w-6 h-6 cursor-pointer hover:text-primary transition-colors text-outline"
                        onClick={handleCloseButtonClick} />
                    
                    <Menu
                        className="w-full"
                        onClick={event => event.stopPropagation()}>
                        <MenuItem
                            data-element-type="if"
                            disabled={isPending}
                            onClick={handleAddElementMenuItemClick}>
                            <Split className="w-4 h-4" />

                            <span>If</span>
                        </MenuItem>

                        <MenuItem
                            data-element-type="assign"
                            disabled={isPending}
                            onClick={handleAddElementMenuItemClick}>
                            <Equal className="w-4 h-4" />

                            <span>Assign</span>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <CirclePlus
                    className="w-6 h-6 cursor-pointer hover:text-primary transition-colors text-outline"
                    onClick={handleOpenButtonClick} />
            )}
        </div>
    )
}