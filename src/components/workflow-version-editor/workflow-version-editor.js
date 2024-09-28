'use client';

import React, { useState, useCallback } from 'react';

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

import { Menu, MenuItem } from '~/components/menu';

export default function WorkflowVersionEditor ({ workflowVersion }) {
    return (
        <ReactFlowProvider>
            <WorkflowVersionReactFlow
                workflowVersion={workflowVersion} />
        </ReactFlowProvider>
    );
}

function WorkflowVersionReactFlow ({
    workflowVersion
}) {
    const initialNodes = workflowVersion.elements.map(element => ({
        id: element.id,
        type: element.type,
        position: element.position,
        data: {
            label: element.name,
        }
    }));

    const initialEdges =  workflowVersion.elements.flatMap(element => {
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

    const addNewNode = ({ to, fromNodeId, fromHandleId }) => {
        const newNodeId = crypto.randomUUID();

        setNodes(nodes => nodes.concat({
            id: newNodeId,
            position: screenToFlowPosition(to),
            type: 'new',
            origin: [0.5, -0.5],
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
            to: connectionState.to,
            fromNodeId: connectionState.fromNode.id,
            fromHandleId: connectionState.fromHandle.id,
        })
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
    };

    return (
        <div className="w-full h-full text-black">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onInit={handleInit}
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
        </div>
    );
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

function IfNode () {
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

            If
        </>
    );
}

function AssignNode () {
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

            Assign
        </>
    );
}

function NewNode ({ id, ...params }) {
    const instance = useReactFlow();

    const handleIfClick = () => {
        instance.updateNode(id, {
            type: 'if'
        });
    };

    const handleAssignClick = () => {
        instance.updateNode(id, {
            type: 'assign'
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

