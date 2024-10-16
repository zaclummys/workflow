'use client';

import { useState } from 'react';

import {
    ReactFlow,
    Background,
    Position,
    Handle,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';


import VariablesWorkflowSidebar from './sidebars/variables-sidebar';

import AssignSidebar from '~/components/workflow-version-editor/sidebars/element-sidebar/assign-sidebar';
import IfSidebar from '~/components/workflow-version-editor/sidebars/element-sidebar/if-sidebar';

import NewNode from '~/components/workflow-version-editor/nodes/new-node';
import StartNode from '~/components/workflow-version-editor/nodes/start-node';
import IfNode from '~/components/workflow-version-editor/nodes/if-node';
import AssignNode from '~/components/workflow-version-editor/nodes/assign-node';

import {
    createNode,
    createEdge,
    fromWorkflowElements,
} from '~/components/workflow-version-editor/react-flow-helpers';

export default function WorkflowVersionCanvas (props) {
    return (
        <ReactFlowProvider>
            <WorkflowVersionReactFlow {...props} />
        </ReactFlowProvider>
    );
}

const nodeTypes = {
    new: NewNode,
    start: StartNode,
    if: IfNode,
    assign: AssignNode,
}


function WorkflowVersionReactFlow ({
    localWorkflowVersion,
    onAddVariable,
    onEditVariable,
    onRemoveVariable,
    onAddElement,
    onEditElement,
    onRemoveElement,
}) {
    const instance = useReactFlow();

    const [initialNodes, initialEdges] = fromWorkflowElements(localWorkflowVersion.elements); 

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const { screenToFlowPosition } = useReactFlow();

    const handleConnectEnd = (event, connectionState) => {
        const sourceNodeId = connectionState.fromNode.id;
        const sourceHandleId = connectionState.fromHandle.id;

        if (connectionState.isValid) {
            const edge = createEdge({
                sourceNodeId,
                sourceHandleId,
                targetNodeId: connectionState.toNode.id,
            });

            instance.addEdges(edge);
        } else {
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const node = createNode({
                id: crypto.randomUUID(),
                type: 'new',
                positionX: position.x,
                positionY: position.y,
                data: {
                    position,
                    sourceNodeId,
                    sourceHandleId,
                }
            })

            const edge = createEdge({
                sourceNodeId,
                sourceHandleId,
                targetNodeId: node.id,
            });

            instance.addNodes(node);
            instance.addEdges(edge);
        }
    }

    const [openElementSidebarForNode, setOpenElementSidebarForNode] = useState(null);

    const handleNodeDoubleClick = (event, node) => {
        setOpenElementSidebarForNode(node);
    }

    const handleCloseSidebarButtonClick = () => {
        setOpenElementSidebarForNode(null);
    }

    const handleNodesChange = changes => {
        onNodesChange(changes);

        for (const change of changes) {
            switch (change.type) {
                case 'position':
                    onEditElement(change.id, {
                        positionX: change.position.x,
                        positionY: change.position.y
                    });
                break;
                
                case 'remove':
                    onRemoveElement(change.id);
                break;

                case 'add':
                    if (change.item.type === 'new') continue;

                    onAddElement({
                        id: change.item.id,
                        type: change.item.type,
                        name: change.item.data.label,
                        positionX: change.item.position.x,
                        positionY: change.item.position.y,
                    });
                break;
            }
        }
    }

    const handleEdgesChanges = changes => {
        onEdgesChange(changes);

        for (const change of changes) {
            switch (change.type) {
                case 'add':
                    switch (change.item.sourceHandle) {
                        case 'next':
                            onEditElement(change.item.source, {
                                nextElementId: change.item.target,
                            });
                        break;

                        case 'true':
                            onEditElement(change.item.source, {
                                nextElementIdIfTrue: change.item.target,
                            });
                        break;

                        case 'false':
                            onEditElement(change.item.source, {
                                nextElementIdIfFalse: change.item.target,
                            });
                        break;
                    }
                break;
            }
        }
    }

    const handleBeforeDelete = ({ nodes, edges }) => {
        return nodes.every(node => node.type !== 'start');
    }

    return (
        <div className="w-full h-full relative">
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeDoubleClick={handleNodeDoubleClick}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChanges}
                onConnectEnd={handleConnectEnd}
                onBeforeDelete={handleBeforeDelete}
            >
                <Background
                    size={1}
                    offset={15} />
                <Controls />
                <MiniMap />
            </ReactFlow>

            {openElementSidebarForNode && (
                <ElementSidebar
                    node={openElementSidebarForNode}
                    localWorkflowVersion={localWorkflowVersion}
                    onAddVariable={onAddVariable}
                    onEditVariable={onEditVariable}
                    onRemoveVariable={onRemoveVariable}
                    onCloseButtonClick={handleCloseSidebarButtonClick}
                />
            )}
        </div>
    );
}

function ElementSidebar ({
    node,
    localWorkflowVersion,
    onAddVariable,
    onEditVariable,
    onRemoveVariable,
    onCloseButtonClick,
}) {
    switch (node.type) {
        case 'start':
            return (
                <VariablesWorkflowSidebar
                    onAddVariable={onAddVariable}
                    onEditVariable={onEditVariable}
                    onRemoveVariable={onRemoveVariable}
                    localWorkflowVersion={localWorkflowVersion}
                    onCloseButtonClick={onCloseButtonClick}
                />
            );

        case 'assign':
            return (
                <AssignSidebar
                    localWorkflowVersion={localWorkflowVersion}
                    onCloseButtonClick={onCloseButtonClick}
                />
            );

        case 'if':
            return (
                <IfSidebar
                    localWorkflowVersion={localWorkflowVersion}
                    onCloseButtonClick={onCloseButtonClick}
                />
            );
    }
}

