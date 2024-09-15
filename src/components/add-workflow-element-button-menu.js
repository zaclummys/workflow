import { CirclePlus, Split, Equal, X } from 'lucide-react';

import { useState } from 'react';
import { Menu, MenuItem } from '~/components/menu';

import addElementToWorkflowVersion from '~/actions/add-element-to-workflow-version-action';

export default function AddWorkflowElementButtonMenu({
    previousElementId,
    previousElementBranch,
    workflowVersionId,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleAddButtonClick = () => {
        setIsOpen(true);
    };

    const handleCloseButtonClick = () => {
        setIsOpen(false);
    };

    const handleIfMenuItemClick = async (event) => {
        setIsPending(true);

        await addElementToWorkflowVersion({
            elementData: {
                type: "if",
                name: "New If Element",
                strategy: "all",
                conditions: [],
            },
            previousElementId,
            previousElementBranch,
            workflowVersionId,
        });

        setIsPending(false);
        setIsOpen(false);
    };

    const handleAssignMenuItemClick = async (event) => {
        setIsPending(true);

        await addElementToWorkflowVersion({
            elementData: {
                type: "assign",
                name: "New Assign Element",
            },
            previousElementId,
            previousElementBranch,
            workflowVersionId,
        });

        setIsPending(false);
        setIsOpen(false);
    };

    const handleMenuBackgroundClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            {previousElementBranch === 'true' && (
                <span className="text-sm">True</span>
            )}

            {previousElementBranch === 'false' && (
                <span className="text-sm">False</span>
            )}

            {isOpen ? (
                <>
                    <Menu
                        className="z-50"
                        onClick={event => event.stopPropagation()}>
                        <MenuItem
                            disabled={isPending}
                            onClick={handleIfMenuItemClick}>
                            <Split className="w-4 h-4" />

                            <span>If</span>
                        </MenuItem>

                        <MenuItem
                            disabled={isPending}
                            onClick={handleAssignMenuItemClick}>
                            <Equal className="w-4 h-4" />

                            <span>Assign</span>
                        </MenuItem>

                        <MenuItem
                            disabled={isPending}
                            onClick={handleCloseButtonClick}>
                            <X className="w-4 h-4" />

                            <span>Close</span>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <CirclePlus
                    className="w-6 h-6 cursor-pointer hover:text-primary transition-colors"
                    onClick={handleAddButtonClick} />
            )}
        </div>
    )
}