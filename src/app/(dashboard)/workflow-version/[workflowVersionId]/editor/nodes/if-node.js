import { Handle, Position } from '@xyflow/react';

import SingleHandle from './handles/single-handle';

export default function IfNode ({ data }) {
    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
            />

            <SingleHandle
                id="false"
                type="source"
                position={Position.Left}
            />

            <SingleHandle
                id="true"
                type="source"
                position={Position.Right}
            />

            {data.label}
        </>
    );
}