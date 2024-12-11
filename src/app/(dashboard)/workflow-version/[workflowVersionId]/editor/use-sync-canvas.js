import { useEffect } from 'react';

import {
    useNodesState,
    useEdgesState,
} from '@xyflow/react';

import { fromWorkflowElements } from './react-flow-helpers';

export default function useSyncCanvas (workflowVersion) {
    const [initialNodes, initialEdges] = fromWorkflowElements(workflowVersion.elements); 

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        const [
            workflowVersionNodes,
            workflowVersionEdges,
        ] = fromWorkflowElements(workflowVersion.elements); 

        setNodes(canvasNodes => {
            const canvasNodeIds = canvasNodes.map(node => node.id);
            const workflowVersionNodesIds = workflowVersionNodes.map(node => node.id);

            const nodeIdsInBoth = canvasNodeIds
                .filter(canvasNodeId => workflowVersionNodesIds.includes(canvasNodeId));

            
            const nodeIdsOnlyInCanvas = canvasNodeIds
                .filter(canvasNodeId => !workflowVersionNodesIds.includes(canvasNodeId));

            const nodeIdsOnlyInWorkflowVersion = workflowVersionNodesIds
                .filter(workflowVersionNodeId => !canvasNodeIds.includes(workflowVersionNodeId));

            const nodeIdsInBothUpdated = nodeIdsInBoth.map(nodeId => {
                const canvasNode = canvasNodes.find(node => node.id === nodeId);
                const workflowVersionNode = workflowVersionNodes.find(node => node.id === nodeId);

                return {
                    ...canvasNode,
                    ...workflowVersionNode,
                }
            });

            const nodeIdsOnlyInCanvasUpdated = nodeIdsOnlyInCanvas.map(nodeId => {
                return canvasNodes.find(node => node.id === nodeId);
            });

            const nodeIdsOnlyInWorkflowVersionUpdated = nodeIdsOnlyInWorkflowVersion.map(nodeId => {
                return workflowVersionNodes.find(node => node.id === nodeId);
            });

            return [
                ...nodeIdsInBothUpdated,
                ...nodeIdsOnlyInCanvasUpdated,
                ...nodeIdsOnlyInWorkflowVersionUpdated,
            ];
        });

        setEdges(edges => {
            const updatedEdges = edges.map(edge => {
                const initialEdge = workflowVersionEdges.find(initialEdge => initialEdge.id === edge.id);
    
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
    
    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
    }
}