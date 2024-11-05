import {
    Handle,
    Position,
} from '@xyflow/react';

export default function StartNode () {
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