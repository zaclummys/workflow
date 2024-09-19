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
                workflowVersionId={workflowVersion.id}
                workflowElementHierarchy={workflowElementHierarchy}
                onCanvasElementClick={onCanvasElementClick} />
        </Canvas>
    );
}

function WorkflowElementHierarchy ({
    workflowVersionId,
    workflowElementHierarchy,
    onCanvasElementClick,
}) {
    switch (workflowElementHierarchy.type) {
        case 'start':
        case 'assign':
            return (
                <div className="grid grid-cols-1 justify-items-center min-w-40">
                    <WorkflowElement
                        workflowElement={workflowElementHierarchy}
                        onClick={onCanvasElementClick}/>

                    <AddWorkflowElementButtonMenu
                        previousElementId={workflowElementHierarchy.id}
                        workflowVersionId={workflowVersionId}/>

                    {workflowElementHierarchy.nextElementHierarchy && (
                        <WorkflowElementHierarchy
                            workflowVersionId={workflowVersionId}
                            workflowElementHierarchy={workflowElementHierarchy.nextElementHierarchy}
                            onCanvasElementClick={onCanvasElementClick}/>
                    )}
                </div>
            );

        case 'if':
            return (
                <>
                    <div className="grid grid-cols-3 items-start gap-4 min-w-40">
                        <div>
                            <AddWorkflowElementButtonMenu
                                previousElementBranch="false"
                                previousElementId={workflowElementHierarchy.id}
                                workflowVersionId={workflowVersionId}/>

                            {workflowElementHierarchy.nextElementIfFalseHierarchy && (
                                <WorkflowElementHierarchy
                                    workflowVersionId={workflowVersionId}
                                    workflowElementHierarchy={workflowElementHierarchy.nextElementIfFalseHierarchy}
                                    onCanvasElementClick={onCanvasElementClick}
                                />
                            )}
                        </div>

                        <WorkflowElement
                            workflowElement={workflowElementHierarchy}
                            onClick={onCanvasElementClick}/>

                        <div>
                            <AddWorkflowElementButtonMenu
                                previousElementBranch="true"
                                previousElementId={workflowElementHierarchy.id}
                                workflowVersionId={workflowVersionId}/>

                            {workflowElementHierarchy.nextElementIfTrueHierarchy && (
                                <WorkflowElementHierarchy
                                    workflowVersionId={workflowVersionId}
                                    workflowElementHierarchy={workflowElementHierarchy.nextElementIfTrueHierarchy}
                                    onCanvasElementClick={onCanvasElementClick}
                                />
                            )}
                        </div>
                    </div>
                </>
            );

        default:
            return null;
    }
}

function WorkflowElement ({
    workflowElement,
    onClick,
}) {
    return (
        <div
            data-workflow-element-id={workflowElement.id}
            className="bg-surface-high text-on-surface hover:ring hover:ring-primary rounded-md p-4 cursor-pointer transition-all"
            onClick={onClick}>
            <span className="text-sm select-none">
                {workflowElement.name}
            </span>
        </div>
    );
}

