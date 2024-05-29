import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkflowVersionById } from '~/core/data/mongodb/workflow-version';
import { insertWorkflowExecution } from '~/core/data/mongodb/workflow-execution';
import { WorkflowExecution } from '~/core/domain/workflow-execution';

export default async function executeWorkflowVersion ({
    workflowVersionId,
    inputValues,
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

    const workflowExecution = WorkflowExecution.create({
        workflowVersionId,
        executedById: session.getUserId(),
    });

    await insertWorkflowExecution(workflowExecution);

    return {
        success: true,
        workflowExecutionId: workflowExecution.getId(),
    };
}