import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkflowVersionById } from '~/core/data/mongodb/workflow-version';

import { insertWorkflowExecution } from '~/core/data/mongodb/workflow-execution';

export default async function executeWorkflowVersion ({
    inputs,
    workflowVersionId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
        };
    }

    const execution = workflowVersion.execute({
        inputs,
        userId: session.getUserId(),
    });

    await insertWorkflowExecution(execution);

    return {
        success: true,
        workflowExecutionId: execution.getId(),
    };
}