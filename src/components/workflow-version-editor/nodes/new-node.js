import {
    Handle,
    Position,
    useReactFlow,
} from '@xyflow/react';

import { Split, Equal, X } from 'lucide-react';

import { Menu, MenuItem } from '~/components/menu';

import { createNode, createEdge } from '~/components/workflow-version-editor/react-flow-helpers';

export default function NewNode ({ id, data: { sourceNodeId, sourceHandleId, position } }) {
    const instance = useReactFlow();

    const addNode = ({ type, label }) => {
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

