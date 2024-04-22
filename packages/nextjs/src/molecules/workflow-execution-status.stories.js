import WorkflowExecutionStatus from "./workflow-execution-status";

export default {
    component: WorkflowExecutionStatus,
};

export const Success = {
    args: {
        status: 'success',
    },
};

export const Error = {
    args: {
        status: 'error',
    },
};

export const Running = {
    args: {
        status: 'running',
    },
};
