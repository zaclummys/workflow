import { findSessionByToken } from '~/core/data/mongodb/session';
import { deleteWorkflowById } from '~/core/data/mongodb/workflow';
import { countWorkflowVersionsByWorkflowId } from '~/core/data/mongodb/workflow-version';

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

    const amountOfWorkflowVersions = await countWorkflowVersionsByWorkflowId(workflowId);

    if (amountOfWorkflowVersions > 0) {
        return {
            success: false,
        }
    }

    await deleteWorkflowById(workflowId);

    return {
        success: true,
    };
}