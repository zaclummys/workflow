import { findSessionByToken } from '~/core/data/mongodb/session';
import { findWorkflowVersionById } from '~/core/data/mongodb/workflow-version';

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

    const execution = await workflowVersion.execute({ inputs });

    console.log(execution);
}