import { findSessionByToken } from "../data/mongodb/session";

import {
    findWorkflowById,
    updateWorkflow,
} from "../data/mongodb/workflow";

export default async function editWorkflow ({
    name,
    description,
    workflowId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return { success: false };
    }

    const workflow = await findWorkflowById(workflowId);

    if (!workflow) {
        return { success: false };
    }

    workflow.setName(name);
    workflow.setDescription(description);

    await updateWorkflow(workflow);

    return { success: true };
}