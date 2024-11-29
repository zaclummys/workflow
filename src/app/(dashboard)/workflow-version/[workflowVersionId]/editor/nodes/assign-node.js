import { Position } from '@xyflow/react';

import SingleHandle from './handles/single-handle';

export default function AssignNode ({ data }) {
    return (
        <>
            <SingleHandle
                type="target"
                position={Position.Top}
            />

            <SingleHandle
                type="source"
                id="next"
                position={Position.Bottom}
            />

            {data.label}
        </>
    );
}