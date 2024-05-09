import WorkflowVersionStatus from "./workflow-version-status";

export default {
    component: WorkflowVersionStatus,
};

export const Active = {
    args: {
        status: 'active',
    },
};

export const Inactive = {
    args: {
        status: 'inactive',
    },
};

export const Draft = {
    args: {
        status: 'draft',
    },
};
