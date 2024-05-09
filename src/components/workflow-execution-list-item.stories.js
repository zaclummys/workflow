import { subDays, subMinutes } from 'date-fns';

import WorkflowExecutionListItem from "./workflow-execution-list-item";

export default {
    component: WorkflowExecutionListItem,
};

const workflowExecutionWithSuccess = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    number: 100,
    executedAt: new Date(),
    executedBy: 'John Doe',
    status: 'success',
};

const workflowExecutionWithError = {
    id: '71c18f57-10c5-405b-aa7d-8308732f4945',
    number: 85,
    executedAt: subDays(new Date(), 3),
    executedBy: 'Jane Doe',
    status: 'error',
};

const runningWorkflowExecution = {
    id: 'c07c4ce9-b423-4570-8dc6-4e2b787f874a',
    number: 17,
    executedAt: subMinutes(new Date(), 5),
    executedBy: 'Cameron Diaz',
    status: 'running',
};

export const Default = {
    args: {
        execution: workflowExecutionWithSuccess,
    },
};

export const Error = {
    args: {
        execution: workflowExecutionWithError,
    },
};

export const Running = {
    args: {
        execution: runningWorkflowExecution,
    },
};
