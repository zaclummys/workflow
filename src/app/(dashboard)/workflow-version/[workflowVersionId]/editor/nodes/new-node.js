import {
    useReactFlow,
    Position,
} from '@xyflow/react';

import { Split, Equal, X } from 'lucide-react';

import { Menu, MenuItem } from '~/components/menu';

import SingleHandle from './handles/single-handle';

export default function NewNode ({ id, data: { onNodeTypeSelected } }) {
    const instance = useReactFlow();

    const close = () => {
        instance.deleteElements({
            nodes: [{ id }],
        });
    }

    const handleIfClick = () => {
        onNodeTypeSelected({
            type: 'if',
            label: 'New If',
        });

        close();
    }

    const handleAssignClick = () => {
        onNodeTypeSelected({
            type: 'assign',
            label: 'New Assign',
        });

        close();
    }

    const handleCancelClick = () => {
        instance.deleteElements({
            nodes: [{ id }],
        });

        close();
    }

    return (
        <>
            <SingleHandle
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

