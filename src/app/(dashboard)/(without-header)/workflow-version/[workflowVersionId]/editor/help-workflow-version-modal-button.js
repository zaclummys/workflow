import { useState } from 'react';

import { Modal, ModalFooter, ModalTitle } from '~/components/modal';

import { OutlineButton, PrimaryButton } from '~/components/button';

import { Circle } from '~/components/icon';

export default function HelpWorkflowVersionModalButton () {
    const [isOpen, setIsOpen] = useState(false);

    const handleHelpButtonClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <OutlineButton
                onClick={handleHelpButtonClick}>
                Help
            </OutlineButton>

            {isOpen && (
                <Modal>
                    <ModalTitle>Help</ModalTitle>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="font-semibold">Add Node</span>
                            <span>Click and drag <Handle /> from the desired node.</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold">Open Sidebar</span>
                            <span>Double-click an "if" or "assign" node to open the sidebar.</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold">Remove Node</span>
                            <span>Select the node and press Backspace (Windows) or Delete (Mac).</span>
                            <span>Alternatively, click the Remove button in the sidebar if it is open.</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold">Disconnect Nodes</span>
                            <span>Click the edge connecting the nodes and press Backspace (Windows) or Delete (Mac).</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold">Connect Nodes</span>
                            <span>Click and drag <Handle /> to another <Handle /> to establish a connection.</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold">Execute</span>

                            <span>To execute the Workflow Version:</span>

                            <ol className="list-decimal ml-12">
                                <li>Activate the Workflow Version.</li>
                                <li>Navigate back to the Workflow Version page.</li>
                                <li>Click the Run button.</li>
                            </ol>
                        </div>
                    </div>

                    <ModalFooter className="justify-end">
                        <PrimaryButton onClick={handleClose}>
                            Close
                        </PrimaryButton>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
}

function Handle () {
    return (
        <Circle className="w-3 h-3 inline" />
    );
}