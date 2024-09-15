'use client';

import { useState } from 'react';

import Canvas from '~/components/canvas';
import VariablesWorkflowSidebar from '~/components/workflow-version-editor/sidebars/variables-workflow-sidebar';
import AddWorkflowElementButtonMenu from '~/components/add-workflow-element-button-menu';

export default function WorkflowVersionCanvas({
    workflowVersion,
    onCanvasElementClick,
}) {
    const findElementByType = (elementType) => {
        return workflowVersion.elements.find(element => element.type === elementType);
    };

    const findElementById = (elementId) => {
        return workflowVersion.elements.find(element => element.id === elementId);
    };

    const startElement = findElementByType('start');

    return (
        <Canvas>
            <WorkflowElementWithHiearchy
                onElementClick={onCanvasElementClick}
                findElementById={findElementById}
                element={startElement}
                workflowVersionId={workflowVersion.id}
                onElementlick={onCanvasElementClick} />
        </Canvas>
    );
}

function WorkflowElementWithHiearchy({
    element,
    findElementById,
    onElementClick,
    workflowVersionId,
}) {
    if (!element) return null;

    const nextElement = findElementById(element.nextElementId);

    return (
        <>        
            <WorkflowElement
                onClick={onElementClick}
                element={element} />

            {element.type === 'if' ? (
                <div className="grid grid-cols-2 w-full">                    
                    <div className="flex flex-col gap-4 items-center">
                        <AddWorkflowElementButtonMenu
                            previousElementBranch="false"
                            previousElementId={element.id}
                            workflowVersionId={workflowVersionId} />

                        <WorkflowElementWithHiearchy
                            onElementClick={onElementClick}
                            element={findElementById(element.nextElementIdIfFalse)}
                            findElementById={findElementById}
                            workflowVersionId={workflowVersionId} />
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <AddWorkflowElementButtonMenu
                            previousElementBranch="true"
                            previousElementId={element.id}
                            workflowVersionId={workflowVersionId} />

                        <WorkflowElementWithHiearchy
                            onElementClick={onElementClick}
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

                    <WorkflowElementWithHiearchy
                        onElementClick={onElementClick}
                        element={nextElement}
                        findElementById={findElementById}
                        workflowVersionId={workflowVersionId} />
                </>
            )}
        </>
    );
}

function WorkflowElement ({
    element,
    onClick,
}) {

    const onClick = () => {};
    
    return (
        <div
            data-element-id={element.id}
            data-element-type={element.type}
            className="inline-flex bg-surface-high text-on-surface hover:ring hover:ring-primary hover:ring-2 rounded-md p-4 cursor-pointer transition-all"
            onClick={onClick}>
            <span>{element.name}</span>
        </div>
    );
}

