'use client';

import Canvas from '~/components/canvas';
import AddWorkflowElementButtonMenu from '~/components/add-workflow-element-button-menu';

function buildWorkflowElementHierarchyFromWorkflowVersion (workflowVersion) {
    const findWorkflowElementByType = (workflowElementType) => {
        if (!workflowElementType) return null;
        
        return workflowVersion.elements.find(workflowElement => workflowElement.type === workflowElementType);
    };

    const findWorkflowElementById = (workflowElementId) => {
        if (!workflowElementId) return null;
        
        return workflowVersion.elements.find(workflowElement => workflowElement.id === workflowElementId);
    };
    
    if (!workflowVersion) return null;
    
    const startWorkflowElement = findWorkflowElementByType('start');
    
    if (!startWorkflowElement) return null;
    
    const buildWorkflowElementHierarchy = workflowElementId => {
        if (!workflowElementId) return null;
        
        const workflowElement = findWorkflowElementById(workflowElementId);
        
        if (!workflowElement) return null;
        
        switch (workflowElement.type) {
            case 'start':
                return {
                    ...workflowElement,
                    nextElementHierarchy: buildWorkflowElementHierarchy(workflowElement.nextElementId),
                };
            
            case 'assign':
                return {
                    ...workflowElement,
                    nextElementHierarchy: buildWorkflowElementHierarchy(workflowElement.nextElementId),
                };
                
            case 'if':
                return {
                    ...workflowElement,
                    nextElementIfTrueHierarchy: buildWorkflowElementHierarchy(workflowElement.nextElementIdIfTrue),
                    nextElementIfFalsHierarchy: buildWorkflowElementHierarchy(workflowElement.nextElementIdIfFalse),
                };
                
            default:
                return workflowElement;
        }
    };
    
    return buildWorkflowElementHierarchy(startWorkflowElement.id);
}

export default function WorkflowVersionCanvas({
    workflowVersion,
    onCanvasElementClick,
}) {
    const workflowElementHierarchy = buildWorkflowElementHierarchyFromWorkflowVersion(workflowVersion);
    
    if (!workflowElementHierarchy) return null;
    
    return (
        <Canvas>
            <WorkflowElementHierarchy
                workflowElementHierarchy={workflowElementHierarchy}
                onCanvasElementClick={onCanvasElementClick} />
        </Canvas>
    );
}

function WorkflowElementHierarchy ({
    workflowElementHierarchy,
    onCanvasElementClick,
}) {
    return (
        <>
            <WorkflowElement
                workflowElement={workflowElementHierarchy}
                onClick={onCanvasElementClick} />
            
            <AddWorkflowElementButtonMenu />

            {workflowElementHierarchy.nextElementHierarchy && (
                <WorkflowElementHierarchy
                    workflowElementHierarchy={workflowElementHierarchy.nextElementHierarchy}
                    onCanvasElementClick={onCanvasElementClick} />
            )}
        </>
    );
}

function WorkflowElement ({
    workflowElement,
    onClick,
}) {
    return (
        <div
            data-workflow-element-id={workflowElement.id}
            className="inline-flex bg-surface-high text-on-surface hover:ring hover:ring-primary rounded-md p-4 cursor-pointer transition-all"
            onClick={onClick}>
            <span>{workflowElement.name}</span>
        </div>
    );
}

