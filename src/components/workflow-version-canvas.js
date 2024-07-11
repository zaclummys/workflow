'use client';

import { useEffect, useState } from 'react';

import VariablesWorkflowSidebar from './workflow-sidebars/variables-workflow-sidebar';
import { Menu, MenuItem } from '~/components/menu';

export default function WorkflowVersionCanvas({
    workflowVersion,
}) {
    const [isVariablesSidebarOpen, setIsVariablesSidebarOpen] = useState(false);

    const [isPointerDown, setIsPointerDown] = useState(false);

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const maxTranslateX = 1024;
    const minTranslateX = -1024;

    const onPointerDown = () => {
        setIsPointerDown(true);
    };

    const onPointerUp = () => {
        setIsPointerDown(false);
    };

    const onPointerMove = (event) => {
        if (!isPointerDown) {
            return;
        }

        const { movementX, movementY } = event;

        setTranslateX(translateX => {
            const newTranslateX = translateX + movementX;

            if (newTranslateX > maxTranslateX) {
                return maxTranslateX;
            } else if (newTranslateX < minTranslateX) {
                return minTranslateX;
            } else {
                return newTranslateX;
            }
        });

        setTranslateY(translateY => {
            const newTranslateY = translateY + movementY;

            if (newTranslateY > 0) {
                return 0;
            } else {
                return newTranslateY;
            }
        });
    };

    const findElementByType = (elementType) => {
        return workflowVersion.elements.find(element => element.type === elementType);
    };

    const findElementById = (elementId) => {
        return workflowVersion.elements.find(element => element.id === elementId);
    };

    const handleElementClick = (event) => {
        const element = findElementById(event.currentTarget.dataset.elementId);

        if (!element) {
            return;
        }

        if (element.type === 'start') {
            setIsVariablesSidebarOpen(true);
        }
    }

    const startElement = findElementByType('start');

    return (
        <div className="w-full h-full bg-background text-outline-variant">
            <Pane
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}>
                <Pattern
                    translateX={translateX}
                    translateY={translateY}
                />

                <Viewport
                    translateX={translateX}
                    translateY={translateY}>
                    <WorkflowElement
                        findElementById={findElementById}
                        element={startElement}
                        workflowVersionId={workflowVersion.id} />
                </Viewport>
            </Pane>

            {isVariablesSidebarOpen && (
                <VariablesWorkflowSidebar
                    workflowVersion={workflowVersion}
                    onCloseButtonClick={() => setIsVariablesSidebarOpen(false)} />
            )}
        </div>
    );
}

function Pattern({
    translateX,
    translateY,
}) {
    return (
        <svg className="absolute w-full h-full text-outline-variant">
            <pattern id="pattern" x={translateX} y={translateY} width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>

            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
    );
}

function Pane({
    onPointerDown,
    onPointerMove,
    onPointerUp,
    children,
}) {
    return (
        <div
            className="relative w-full h-full overflow-hidden"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}>
            {children}
        </div>
    )
}

function Viewport({
    translateX,
    translateY,
    children,
}) {
    return (
        <div
            className="flex flex-col items-center gap-4 p-10"
            style={{
                transform: `translate(${translateX}px, ${translateY}px)`,
            }}>
            {children}
        </div>
    )
}

function WorkflowElement({
    element,
    findElementById,
    workflowVersionId,
}) {
    if (!element) return null;

    const nextElement = findElementById(element.nextElementId);

    return (
        <>        
            <WorkflowElementButton
                element={element} />

            {element.type === 'if' ? (
                <div className="grid grid-cols-2 w-full">                    
                    <div className="flex flex-col gap-4 items-center">
                        <AddWorkflowElementButtonMenu
                            previousElementBranch="false"
                            previousElementId={element.id}
                            workflowVersionId={workflowVersionId} />

                        <WorkflowElement
                            element={findElementById(element.nextElementIdIfFalse)}
                            findElementById={findElementById}
                            workflowVersionId={workflowVersionId} />
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <AddWorkflowElementButtonMenu
                            previousElementBranch="true"
                            previousElementId={element.id}
                            workflowVersionId={workflowVersionId} />

                        <WorkflowElement
                            element={findElementById(element.nextElementIdIfTrue)}
                            findElementById={findElementById}
                            workflowVersionId={workflowVersionId} />
                    </div>
                </div>
            ) : (
                <>                            
                    <AddWorkflowElementButtonMenu
                        previousElementId={element.id}
                        workflowVersionId={workflowVersionId} />

                    <WorkflowElement
                        element={nextElement}
                        findElementById={findElementById}
                        workflowVersionId={workflowVersionId} />
                </>
            )}
        </>
    );
}

function WorkflowElementButton({
    element,
    onClick,
}) {
    return (
        <div
            className="inline-flex bg-surface-high text-on-surface hover:ring hover:ring-primary hover:ring-2 rounded-md p-4 cursor-pointer transition-all"
            onClick={onClick}>
            <span>{element.name}</span>
        </div>
    );
}

import { CirclePlus, Split, Equal, X } from 'lucide-react';

import addElementToWorkflowVersion from '~/actions/add-element-to-workflow-version-action';

function AddWorkflowElementButtonMenu({
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
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={handleMenuBackgroundClick} />

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