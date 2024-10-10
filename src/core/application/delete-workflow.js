import { findSessionByToken } from '~/core/data/mongodb/session';
import { deleteWorkflowById } from '~/core/data/mongodb/workflow';

import {
    findWorkflowVersionIdsByWorkflowId,
    deleteWorkflowVersionsByIds,
} from '~/core/data/mongodb/workflow-version';

import {
    findWorkflowExecutionIdsByWorkflowVersionIds,
    deleteWorkflowExecutionsByIds,
} from '~/core/data/mongodb/workflow-execution';

export default async function deleteWorkflow ({
    workflowId,
    sessionToken,
}) {
    if (!workflowId || !sessionToken) {
        return {
            success: false,
        };
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workflowVersionIds = await findWorkflowVersionIdsByWorkflowId(workflowId);
    const workflowExecutionIds = await findWorkflowExecutionIdsByWorkflowVersionIds(workflowVersionIds);

    await deleteWorkflowExecutionsByIds(workflowExecutionIds);
    await deleteWorkflowVersionsByIds(workflowVersionIds);
    await deleteWorkflowById(workflowId);

    return {
        success: true,
    };
}