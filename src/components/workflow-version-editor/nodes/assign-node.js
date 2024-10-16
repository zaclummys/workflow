import {
    Handle,
    Position,
} from '@xyflow/react';

export default function AssignNode ({ data }) {
    return (
        <>
            <Handle
                type="source"
                id="next"
                position={Position.Bottom}
            />

            <Handle
                type="target"
                position={Position.Top}
            />


            {data.label}
        </>
    );
}