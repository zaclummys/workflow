'use client';

import '@xyflow/react/dist/style.css';

import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';

import {
    createNode,
    createEdge,
} from './react-flow-helpers';

import NewNode from './nodes/new-node';
import StartNode from './nodes/start-node';
import IfNode from './nodes/if-node';
import AssignNode from './nodes/assign-node';

import useSyncCanvas from './use-sync-canvas';

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
    onElementSelect,
    onElementMove,
    
    onElementConnect,
    onElementDisconnect,

    onElementAdd,
    onElementRemove,

    workflowVersion,
}) {
    const instance = useReactFlow();

    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
    } = useSyncCanvas(workflowVersion);

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
            const position = instance.screenToFlowPosition({
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
        onNodesChange(changes.filter(change => change.type !== 'add' || change.item.type !== 'if'));

        for (const change of changes) {
            switch (change.type) {
                case 'position':
                    onElementMove({
                        elementId: change.id,
                        positionX: change.position.x,
                        positionY: change.position.y,
                    });
                break;
                
                case 'remove':
                    onElementRemove(change.id);
                break;

                case 'add': {
                    switch (change.item.type) {
                        case 'if': {
                            onElementAdd({
                                id: change.item.id,
                                type: change.item.type,
                                name: change.item.data.label,
                                positionX: change.item.position.x,
                                positionY: change.item.position.y,
                                strategy: 'all',
                                description: '',
                                conditions: [],
                            });
                        }
                        break;

                        case 'assign': {
                            onElementAdd({
                                id: change.item.id,
                                type: change.item.type,
                                name: change.item.data.label,
                                positionX: change.item.position.x,
                                positionY: change.item.position.y,
                                description: '',
                                assignments: [],
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
                            onElementConnect({
                                sourceElementId: change.item.source,
                                targetElementId: change.item.target,
                            });
                        break;

                        case 'true':
                            onElementConnect({
                                connectionType: 'true',
                                sourceElementId: change.item.source,
                                targetElementId: change.item.target,
                            })
                        break;

                        case 'false':
                            onElementConnect({
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
                            onElementDisconnect({
                                elementId: removedEdge.source,
                            });
                        break;

                        case 'true':
                            onElementDisconnect({
                                connectionType: 'true',
                                elementId: removedEdge.source,
                            })
                        break;

                        case 'false':
                            onElementDisconnect({
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

    const handleNodeDoubleClick = (event, node) => {
        const element = workflowVersion.elements.find(element => element.id === node.id);

        if (!element) {
            return;
        }
        
        onElementSelect(element);
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
        </div>
    );
}
