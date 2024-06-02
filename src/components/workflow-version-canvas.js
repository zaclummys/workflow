'use client';

import { useState } from 'react';

import VariablesWorkflowSidebar from './variables-workflow-sidebar';

export default function WorkflowVersionCanvas ({
    workflowVersion,
    onElementClick,
}) {
    const [isVariablesSidebarOpen, setIsVariablesSidebarOpen] = useState(false);

    const [isPointerDown, setIsPointerDown] = useState(false);

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const maxTranslate = 1024;
    const minTranslate = -1024;

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

            if (newTranslateX > maxTranslate) {
                return maxTranslate;
            } else if (newTranslateX < minTranslate) {
                return minTranslate;
            } else {
                return newTranslateX;
            }
        });

        setTranslateY(translateY => {
            const newTranslateY = translateY + movementY;

            if (newTranslateY > maxTranslate) {
                return maxTranslate;
            } else if (newTranslateY < minTranslate) {
                return minTranslate;
            } else {
                return newTranslateY;
            }
        });
    };

    const findElementById = (elementId) => {
        return workflowVersion.elements.find(element => element.id === elementId);
    };

    const handleElementClick = (event) => {
        const element = findElementById(event.target.dataset.elementId);
        console.log(element)
        if (!element) {
            return;
        }

        if (element.type === 'start') {
            setIsVariablesSidebarOpen(true);
        }
    }

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
                        {workflowVersion.elements.map(element => (
                                <WorkflowElement
                                    key={element.id}
                                    element={element}
                                    onClick={handleElementClick} />
                            ))
                        }
                </Viewport>
            </Pane>

            {isVariablesSidebarOpen && (
                <VariablesWorkflowSidebar
                    workflowVersion={workflowVersion}
                    onCloseButtonClick={() => setIsVariablesSidebarOpen(false)}/>
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
                transform: `translate(${translateX}px, ${translateY}px)`
            }}>
            {children}
        </div>
    )
}

function WorkflowElement ({
    element,
    onClick,
}) {
    return (
        <div
            data-element-id={element.id}
            className="bg-surface-high text-on-surface hover:ring hover:ring-primary hover:ring-2 rounded-md p-4 cursor-pointer transition-all"
            onClick={onClick}>
            <span>{element.name}</span>
        </div>
    );
}