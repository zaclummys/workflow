import {
    Badge,
    BadgeAlert,
    BadgeCheck,
} from 'lucide-react';

export default function WorkflowExecutionStatus({ status }) {
    switch (status) {
        case 'success':
            return (
                <span className="inline-flex flex-row items-center gap-2 text-sm font-medium text-positive">
                    <BadgeCheck className="w-5" />

                    Success
                </span>
            );

        case 'error':
            return (
                <span className="flex flex-row items-center gap-2 text-sm font-medium text-negative">
                    <BadgeAlert className="w-5" />

                    Error
                </span>
            );

        case 'running':
            return (
                <span className="flex flex-row items-center gap-2 text-sm font-medium text-neutral">
                    <Badge className="w-5" />

                    Running
                </span>
            );

        case 'pending':
            return (
                <span className="flex flex-row items-center gap-2 text-sm font-medium text-neutral">
                    <Badge className="w-5" />

                    Pending
                </span>
            );

        default:
            return null;
    }
}
