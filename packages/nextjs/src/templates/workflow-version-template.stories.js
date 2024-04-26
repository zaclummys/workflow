import WorkflowVersionTemplate from './workflow-version-template';

export default {
    component: WorkflowVersionTemplate,
};

const workflowVersion = {
    number: 1,

    workflow: {
        id: '5becbf1f-4c00-4b3a-9a7d-f4e5080c2a60',
        name: 'Workflow XYZ',
        workspace: {
            id: 'd388d285-3bc7-4f5f-8c0d-be7001f7065f',
            name: 'Workspace ABC'
        },
    },

    workflowExecutions: [
        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            number: 100,
            executedAt: new Date(),
            executedBy: 'John Doe',
            status: 'success',
        },
    
        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            number: 100,
            executedAt: new Date(),
            executedBy: 'John Doe',
            status: 'error',
        },
    
        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            number: 100,
            executedAt: new Date(),
            executedBy: 'John Doe',
            status: 'running',
        }
    ]
}

export const Active = {
    args: {
        workflowVersion: {
            ...workflowVersion,
            status: 'active',
        }
    },
};

export const Inactive = {
    args: {
        workflowVersion: {
            ...workflowVersion,
            status: 'inactive',
        }
    },
};

export const Draft = {
    args: {
        workflowVersion: {
            ...workflowVersion,
            status: 'draft',
        }
    },
};

export const WithoutExecutions = {
    args: {
        workflowVersion: {
            ...workflowVersion,
            status: 'draft',
            workflowExecutions: [],
        },
    },
};
