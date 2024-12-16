import { Position } from '@xyflow/react';

import SingleHandle from './handles/single-handle';

export default function StartNode () {
    return (
        <>
            <SingleHandle
                type="source"
                id="next"
                position={Position.Bottom}
            />

            Start
        </>
    );
}