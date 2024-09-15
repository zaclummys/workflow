import { getSessionToken } from '../cookies';

import getWorkflowVersions from '~/core/application/get-workflow-versions';

export default async function getWorkflowVersionsAction (workflowId) {
    const sessionToken = getSessionToken();

    return getWorkflowVersions({
        workflowId,
        sessionToken,
    });
}