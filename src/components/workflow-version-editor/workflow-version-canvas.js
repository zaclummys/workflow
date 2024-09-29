'use client';

import { useState, useCallback } from 'react';

import {
    ReactFlow,
    Background,
    Position,
    Handle,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';

import { Split, Equal, X } from 'lucide-react';

import { Menu, MenuItem } from '~/components/menu';
import VariablesWorkflowSidebar from './sidebars/variables-sidebar';

export default function WorkflowVersionCanvas (props) {
    return (
        <ReactFlowProvider>
            <WorkflowVersionReactFlow {...props} />
        </ReactFlowProvider>
    );
}

function WorkflowVersionReactFlow ({
    localWorkflowVersion,
    onAddVariable,
    onEditVariable,
    onRemoveVariable,
}) {
    const initialNodes = localWorkflowVersion.elements.map(element => ({
        id: element.id,
        type: element.type,
        position: element.position,
        data: {
            label: element.name,
        }
    }));

    const initialEdges =  localWorkflowVersion.elements.flatMap(element => {
        const edges = [];

        switch (element.type) {
            case 'start':
            case 'assign':
                if (element.nextElementId) {
                    edges.push({
                        id: `${element.id}->${element.nextElementId}`,
                        source: element.id,
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
                        label: getEdgeLabelFromHandleId('false'),
                    });
                }

                if (element.nextElementIdIfTrue) {
                    edges.push({
                        id: `${element.id}->${element.nextElementIdIfTrue}`,
                        source: element.id,
                        sourceHandle: 'true',
                        target: element.nextElementIdIfTrue,
                        label: getEdgeLabelFromHandleId('true'),
                    });
                }
        }

        return edges;
    });

    const addNewNode = ({ position, fromNodeId, fromHandleId }) => {
        const newNodeId = crypto.randomUUID();

        setNodes(nodes => nodes.concat({
            id: newNodeId,
            position,
            type: 'new',
            origin: [0.5, 0.0],
        }));

        setEdges(edges => edges.concat({
            id: `${fromNodeId}->${newNodeId}`,
            source: fromNodeId,
            sourceHandle: fromHandleId,
            target: newNodeId,
            label: getEdgeLabelFromHandleId(fromHandleId),
        }));
    }

    const { screenToFlowPosition } = useReactFlow();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const handleConnect = (params) => setEdges((eds) => addEdge(params, eds));

    const handleConnectEnd = (event, connectionState) => {
        if (connectionState.isValid) return;

        addNewNode({
            position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            }),
            fromNodeId: connectionState.fromNode.id,
            fromHandleId: connectionState.fromHandle.id,
        });
    };

    function getEdgeLabelFromHandleId (handleId) {
        switch (handleId) {
            case 'true':
                return 'Yes';

            case 'false':
                return 'No';

            default:
                return null;
        }
    }

    const nodeTypes = {
        new: NewNode,
        start: StartNode,
        if: IfNode,
        assign: AssignNode,
    }

    const handleInit = instance => {
        instance.fitView();
    }

    const [openSidebarForNode, setOpenSidebarForNode] = useState(null);

    const handleNodeDoubleClick = (event, node) => {
        setOpenSidebarForNode(node);
    }

    const handleCloseSidebarButtonClick = () => {
        setOpenSidebarForNode(null);
    }

    return (
        <div className="w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onInit={handleInit}
                onNodeDoubleClick={handleNodeDoubleClick}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={handleConnect}
                onConnectEnd={handleConnectEnd}
            >
                <Background
                    size={1}
                    offset={15} />
                <Controls />
                <MiniMap />
            </ReactFlow>

            {openSidebarForNode && (
                <NodeSidebar
                    node={openSidebarForNode}
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

function NodeSidebar ({
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
    }
}

function StartNode () {
    return (
        <>
            <Handle
                type="source"
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
                type="target"
                position={Position.Top}
            />

            <Handle
                type="source"
                position={Position.Bottom}
            />

            {data?.label}
        </>
    );
}



function NewNode ({ id, ...params }) {
    const instance = useReactFlow();

    const handleIfClick = () => {
        instance.updateNode(id, {
            type: 'if',
            data: {
                label: 'New If',
            },
        });
    };

    const handleAssignClick = () => {
        instance.updateNode(id, {
            type: 'assign',
            data: {
                label: 'New Assign',
            },
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
                <MenuItem
                    onClick={handleIfClick}>
                    <Split className="w-4 h-4" />

                    If
                </MenuItem>

                <MenuItem
                    onClick={handleAssignClick}>
                    <Equal className="w-4 h-4" />

                    Assign
                </MenuItem>

                <MenuItem
                    onClick={handleCancelClick}>
                    <X className="w-4 h-4" />

                    Cancel
                </MenuItem>
            </Menu>
        </>
    );
}

