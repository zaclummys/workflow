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

export function createNode ({
    id,
    type,
    positionX,
    positionY,
    data,
}) {
    return {
        id,
        type,
        data,
        position: {
            x: positionX,
            y: positionY,
        },
        origin: [0.5, 0.0],
    }
}

export function createEdge ({
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

export function fromWorkflowElements (workflowElements) {
    const reactFlowNodes = workflowElements.map(element => createNode({
        id: element.id,
        type: element.type,
        positionX: element.positionX,
        positionY: element.positionY,
        data: {
            label: element.name,
        },
    }));

    const reactFlowEdges = workflowElements.flatMap(element => {
        const edges = [];

        switch (element.type) {
            case 'start':
            case 'assign':
                if (element.nextElementId) {
                    const edge = createEdge({
                        sourceNodeId: element.id,
                        sourceHandleId: 'next',
                        targetNodeId: element.nextElementId,
                    });

                    edges.push(edge);
                }

            case 'if':
                if (element.nextElementIdIfFalse) {
                    const edge = createEdge({
                        sourceNodeId: element.id,
                        sourceHandleId: 'false',
                        targetNodeId: element.nextElementIdIfFalse,
                    });

                    edges.push(edge);
                }

                if (element.nextElementIdIfTrue) {
                    const edge = createEdge({
                        sourceNodeId: element.id,
                        sourceHandleId: 'true',
                        targetNodeId: element.nextElementIdIfTrue,
                    });

                    edges.push(edge);
                }
        }

        return edges;
    });

    return [reactFlowNodes, reactFlowEdges];
}