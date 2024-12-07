'use client';

import '@xyflow/react/dist/style.css';

import { useEffect } from 'react';

import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';

import {
    createNode,
    createEdge,
    fromWorkflowElements,
} from './react-flow-helpers';

import NewNode from './nodes/new-node';
import StartNode from './nodes/start-node';
import IfNode from './nodes/if-node';
import AssignNode from './nodes/assign-node';

const nodeTypes = {
    new: NewNode,
    start: StartNode,
    if: IfNode,
    assign: AssignNode,
}

export default function WorkflowVersionEditorCanvas (props) {
    return (
        <ReactFlowProvider>
            <WorkflowVersionReactFlow {...props} />
        </ReactFlowProvider>
    );
}

function WorkflowVersionReactFlow ({
    onNodeDoubleClick,

    workflowVersion,
    dispatchWorkflowVersion,
}) {
    const instance = useReactFlow();

    const [initialNodes, initialEdges] = fromWorkflowElements(workflowVersion.elements); 

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        const [initialNodes, initialEdges] = fromWorkflowElements(workflowVersion.elements); 

        setNodes(nodes => {
            const updatedNodes = nodes.map(node => {
                const initialNode = initialNodes.find(initialNode => {
                    if (initialNode == null) {
                        return false;
                    }

                    return initialNode.id === node.id;
                });
    
                if (!initialNode) {
                    return node;
                }
    
                return {
                    ...node,
                    ...initialNode,
                };
            });

            return updatedNodes;
        });

        setEdges(edges => {
            const updatedEdges = edges.map(edge => {
                const initialEdge = initialEdges.find(initialEdge => initialEdge.id === edge.id);
    
                if (!initialEdge) {
                    return edge;
                }
    
                return {
                    ...edge,
                    ...initialEdge,
                };
            });

            return updatedEdges;
        });
    }, [workflowVersion]);

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
                    onNodeTypeSelected: ({ type, label }) => {
                        const node = createNode({
                            id: crypto.randomUUID(),
                            type,
                            positionX: position.x,
                            positionY: position.y,
                            data: {
                                label
                            },
                        });
                
                        const edge = createEdge({
                            sourceNodeId,
                            sourceHandleId,
                            targetNodeId: node.id,
                        });
                
                        instance.addNodes(node);
                        instance.addEdges(edge);
                    },
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

    const handleNodesChange = changes => {
        onNodesChange(changes);

        for (const change of changes) {
            switch (change.type) {
                case 'position':
                    dispatchWorkflowVersion({
                        type: 'element-moved',
                        elementId: change.id,
                        positionX: change.position.x,
                        positionY: change.position.y,
                    });
                break;
                
                case 'remove':
                    dispatchWorkflowVersion({
                        type: 'element-removed',
                        elementId: change.id,
                    });
                break;

                case 'add': {
                    switch (change.item.type) {
                        case 'if': {
                            dispatchWorkflowVersion({
                                type: 'element-added',
                                element: {
                                    id: change.item.id,
                                    type: change.item.type,
                                    name: change.item.data.label,
                                    positionX: change.item.position.x,
                                    positionY: change.item.position.y,
                                    strategy: 'all',
                                    description: '',
                                    conditions: [],
                                },
                            });
                        }
                        break;

                        case 'assign': {
                            dispatchWorkflowVersion({
                                type: 'element-added',
                                element: {
                                    id: change.item.id,
                                    type: change.item.type,
                                    name: change.item.data.label,
                                    positionX: change.item.position.x,
                                    positionY: change.item.position.y,
                                    description: '',
                                    assignments: [],
                                },
                            });
                        }
                        break;
                    }
                };
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
                            dispatchWorkflowVersion({
                                type: 'element-connected',
                                sourceElementId: change.item.source,
                                targetElementId: change.item.target,
                            });
                        break;

                        case 'true':
                            dispatchWorkflowVersion({
                                type: 'element-connected',
                                connectionType: 'true',
                                sourceElementId: change.item.source,
                                targetElementId: change.item.target,
                            })
                        break;

                        case 'false':
                            dispatchWorkflowVersion({
                                type: 'element-connected',
                                connectionType: 'false',
                                sourceElementId: change.item.source,
                                targetElementId: change.item.target,
                            })
                        break;
                    }
                break;

                case 'remove': {
                    const removedEdge = instance.getEdge(change.id);

                    const source = instance.getNode(removedEdge.source);
                    const target = instance.getNode(removedEdge.target);

                    if (!source || !target) {
                        continue;
                    }

                    if (source.type === 'new' || target.type === 'new') {
                        continue;
                    }

                    switch (removedEdge.sourceHandle) {
                        case 'next':
                            dispatchWorkflowVersion({
                                type: 'element-disconnected',
                                sourceElementId: removedEdge.source,
                            });
                        break;

                        case 'true':
                            dispatchWorkflowVersion({
                                type: 'element-disconnected',
                                connectionType: 'true',
                                elementId: removedEdge.source,
                            })
                        break;

                        case 'false':
                            dispatchWorkflowVersion({
                                type: 'element-disconnected',
                                connectionType: 'false',
                                elementId: removedEdge.source,
                            })
                        break;
                    }
                }
                break;
            }
        }
    }

    const handleBeforeDelete = ({ nodes }) => {
        return nodes.every(node => node.type !== 'start');
    }

    return (
        <div className="w-full h-full relative">
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeDoubleClick={onNodeDoubleClick}
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
        </div>
    );
}
