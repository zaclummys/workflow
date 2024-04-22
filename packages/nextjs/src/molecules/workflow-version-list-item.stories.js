import WorkflowVersionListItem from "./workflow-version-list-item";

export default {
    component: WorkflowVersionListItem,
};

export const activeWorkflowVersion = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    number: 100,
    numberOfExecutions: 4,
    createdAt: new Date(),
    createdBy: 'John Doe',
    status: 'active',
};

export const inactiveWorkflowVersion = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    number: 100,
    numberOfExecutions: 2,
    createdAt: new Date(),
    createdBy: 'John Doe',
    status: 'inactive',
};

export const draftWorkflowVersion = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    number: 100,
    numberOfExecutions: 0,
    createdAt: new Date(),
    createdBy: 'John Doe',
    status: 'draft',
};

export const Active = {
    args: {
        workflowVersion: activeWorkflowVersion
    },
};

export const Inactive = {
    args: {
        workflowVersion: inactiveWorkflowVersion,
    },
};

export const Draft = {
    args: {
        workflowVersion: draftWorkflowVersion,
    },
};
