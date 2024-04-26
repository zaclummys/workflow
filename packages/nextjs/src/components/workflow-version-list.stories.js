import WorkflowVersionList from "./workflow-version-list";

import {
    draftWorkflowVersion,
    activeWorkflowVersion,
    inactiveWorkflowVersion,
} from '~/components/workflow-version-list-item.stories';

export default {
    component: WorkflowVersionList,
};

export const Empty = {
    args: {
        workflowVersions: [],
    },
};

export const Default = {
    args: {
        workflowVersions: [
            activeWorkflowVersion,
            inactiveWorkflowVersion,
            draftWorkflowVersion,
        ],
    },
};
