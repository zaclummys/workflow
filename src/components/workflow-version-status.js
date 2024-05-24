import {
    Badge,
    BadgeAlert,
    BadgeCheck,
} from 'lucide-react';

export default function WorkflowVersionStatus ({ status }) {
    switch (status) {
        case 'active':
            return (
                <span className="flex flex-row gap-2 items-center text-sm font-medium text-positive">
                    <BadgeCheck className="w-5" />

                    <span>Active</span>
                </span>
            );

        case 'inactive':
            return (
                <span className="flex flex-row gap-2 items-center text-sm font-medium text-negative">
                    <BadgeAlert className="w-5" />

                    <span>Inactive</span>
                </span>
            );

        case 'draft':
            return (
                <span className="flex flex-row gap-2 items-center text-sm font-medium text-neutral">
                    <Badge className="w-5" />

                    <span>Draft</span>
                </span>
            );

        default:
            return null;
    }
}
