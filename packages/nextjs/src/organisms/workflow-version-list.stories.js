import WorkflowVersionList from "./workflow-version-list";

import { activeWorkflowVersion } from '~/molecules/workflow-version-list-item.stories';

export default {
    component: WorkflowVersionList,
};

export const Empty = {
    args: {
        workflowVersions: [],
    },
};

export const Active = {
    args: {
        workflowVersions: [
            activeWorkflowVersion,
            activeWorkflowVersion,
            activeWorkflowVersion,
        ],
    },
};
