import { findSessionByToken } from "~/core/data/mongodb/session";

import { 
    deleteWorkflowExecutionsByIds, 
    findWorkflowExecutionIdsByWorkflowVersionId,
} from "~/core/data/mongodb/workflow-execution";

import { deleteWorkflowVersionById } from "~/core/data/mongodb/workflow-version";

export default async function deleteWorkflowVersion ({
    workflowVersionId,
    sessionToken,
}) {
    if (!workflowVersionId || !sessionToken) {
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

    const workflowExecutionIds = await findWorkflowExecutionIdsByWorkflowVersionId(workflowVersionId);

    await deleteWorkflowExecutionsByIds(workflowExecutionIds);
    await deleteWorkflowVersionById(workflowVersionId);

    return {
        success: true,
    };
}