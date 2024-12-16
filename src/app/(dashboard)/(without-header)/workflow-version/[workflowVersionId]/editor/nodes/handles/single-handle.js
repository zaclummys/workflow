import {
    Handle,
    useHandleConnections,
} from '@xyflow/react';

export default function SingleHandle (props) {
    const connections = useHandleConnections({
        id: props.id,
        type: props.type,
    });

    const isConnectable = connections.length === 0;

    return (
        <Handle
            {...props}
            isConnectable={isConnectable}
        />
    );
}