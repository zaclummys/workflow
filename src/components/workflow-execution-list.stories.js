import WorkflowExecutionList from './workflow-execution-list';

export const Default = {
    args: {
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
            },
        ]
    }
};

export const Empty = {
    args: {
        workflowExecutions: []
    }
};

export default {
    component: WorkflowExecutionList
};
