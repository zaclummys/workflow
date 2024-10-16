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

import { Split, Equal, X } from 'lucide-react';

import { Menu, MenuItem } from '~/components/menu';
import VariablesWorkflowSidebar from './sidebars/variables-sidebar';

import AssignSidebar from '~/components/workflow-version-editor/sidebars/element-sidebar/assign-sidebar';
import IfSidebar from '~/components/workflow-version-editor/sidebars/element-sidebar/if-sidebar';

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

function getEdgeLabelSourceHandleId (handleId) {
    switch (handleId) {
        case 'true':
            return 'Yes';

        case 'false':
            return 'No';

        default:
            return null;
    }
}

function createNode ({ type, label, position, }) {
    return {
        id: crypto.randomUUID(),
        type,
        data: {
            label,
        },
        position,
        origin: [0.5, 0.0],
    }
}

function createEdge ({
    sourceNodeId,
    sourceHandleId,
    targetNodeId,
}) {
    return {
        id: `${sourceNodeId}:${sourceHandleId}->${targetNodeId}`,
        source: sourceNodeId,
        sourceHandle: sourceHandleId,
        target: targetNodeId,
        label: getEdgeLabelSourceHandleId(sourceHandleId),
    }
}

function fromWorkflowElements (workflowElements) {
    const reactFlowNodes = workflowElements.map(element => ({
        id: element.id,
        type: element.type,
        position: {
            x: element.positionX,
            y: element.positionY,
        },
        data: {
            label: element.name,
        }
    }));

    const reactFlowEdges = workflowElements.flatMap(element => {
        const edges = [];

        switch (element.type) {
            case 'start':
            case 'assign':
                if (element.nextElementId) {
                    edges.push({
                        id: `${element.id}->${element.nextElementId}`,
                        source: element.id,
                        sourceHandle: 'next',
                        target: element.nextElementId,
                    });
                }

            case 'if':
                if (element.nextElementIdIfFalse) {
                    edges.push({
                        id: `${element.id}->${element.nextElementIdIfFalse}`,
                        source: element.id,
                        sourceHandle: 'false',
                        target: element.nextElementIdIfFalse,
                        label: getEdgeLabelSourceHandleId('false'),
                    });
                }

                if (element.nextElementIdIfTrue) {
                    edges.push({
                        id: `${element.id}->${element.nextElementIdIfTrue}`,
                        source: element.id,
                        sourceHandle: 'true',
                        target: element.nextElementIdIfTrue,
                        label: getEdgeLabelSourceHandleId('true'),
                    });
                }
        }

        return edges;
    });

    return [reactFlowNodes, reactFlowEdges];
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

            const targetNodeId = crypto.randomUUID();

            const node = {
                id: targetNodeId,
                position,
                type: 'new',
                origin: [0.5, 0.0],
                data: {
                    position,
                    sourceNodeId,
                    sourceHandleId,
                }
            };

            const edge = createEdge({
                sourceNodeId,
                sourceHandleId,
                targetNodeId,
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

                case 'remove':
                    console.log(change)
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

function StartNode () {
    return (
        <>
            <Handle
                type="source"
                id="next"
                position={Position.Bottom}
            />

            Start
        </>
    );
}

function IfNode ({ data }) {
    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
            />

            <Handle
                type="source"
                id="false"
                position={Position.Left}
            />

            <Handle
                type="source"
                id="true"
                position={Position.Right}
            />

            {data?.label}
        </>
    );
}

function AssignNode ({ data }) {
    return (
        <>
            <Handle
                type="source"
                id="next"
                position={Position.Bottom}
            />

            <Handle
                type="target"
                position={Position.Top}
            />


            {data?.label}
        </>
    );
}

function NewNode ({ id, data: { sourceNodeId, sourceHandleId, position } }) {
    const instance = useReactFlow();

    const addNode = ({ type, label }) => {
        const node = createNode({
            type,
            label,
            position,
        });

        const edge = createEdge({
            sourceNodeId,
            sourceHandleId,
            targetNodeId: node.id,
        });

        instance.addNodes(node);
        instance.addEdges(edge);

        instance.deleteElements({
            nodes: [{ id }]
        });
    }

    const handleIfClick = () => {
        addNode({
            type: 'if',
            label: 'New If',
        });
    }

    const handleAssignClick = () => {
        addNode({
            type: 'assign',
            label: 'New Assign',
        });
    }

    const handleCancelClick = () => {
        instance.deleteElements({
            nodes: [{ id }],
        });
    }

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
            />

            <Menu>
                <MenuItem onClick={handleIfClick}>
                    <Split className="w-4 h-4" />

                    If
                </MenuItem>

                <MenuItem onClick={handleAssignClick}>
                    <Equal className="w-4 h-4" />

                    Assign
                </MenuItem>

                <MenuItem onClick={handleCancelClick}>
                    <X className="w-4 h-4" />

                    Cancel
                </MenuItem>
            </Menu>
        </>
    );
}

