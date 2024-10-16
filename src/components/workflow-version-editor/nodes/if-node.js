import {
    Handle,
    Position,
} from '@xyflow/react';

export default function IfNode ({ data }) {
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

            {data.label}
        </>
    );
}