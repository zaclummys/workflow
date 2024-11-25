import { Position } from '@xyflow/react';

import SingleHandle from './handles/single-handle';

export default function AssignNode ({ data }) {
    return (
        <>
            <SingleHandle
                type="source"
                id="next"
                position={Position.Bottom}
            />

            <SingleHandle
                type="target"
                position={Position.Top}
            />

            {data.label}
        </>
    );
}