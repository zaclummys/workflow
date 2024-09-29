import { findSessionByToken } from "~/core/data/mongodb/session";

import { 
    findWorkflowVersionById,
    insertWorkflowVersion,
    updateWorkflowVersion,
} from "~/core/data/mongodb/workflow-version";

import { 
    findWorkflowById, 
    updateWorkflow,
} from "../data/mongodb/workflow";

export default async function saveWorkflowVersion ({
    sessionToken,
    workflowVersionId,
    workflowVersionChanges,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        }
    }

    const workflowVersion = await findWorkflowVersionById(workflowVersionId);

    if (!workflowVersion) {
        return {
            success: false,
        }
    }

    const workflow = await findWorkflowById(workflowVersion.getWorkflowId());

    if (!workflow) {
        return {
            success: false,
        }
    }
    
    if (workflowVersion.isDraft()) {
        workflowVersion.change(workflowVersionChanges);

        await updateWorkflowVersion(workflowVersion);

        return {
            success: true,
            savedWorkflowVersionId: workflowVersion.getId(),
        };
    } else {
        const nextWorkflowVersionNumber = workflow.takeNextVersionNumber();

        const newWorkflowVersion = workflowVersion.changeAsNewVersion({
            nextWorkflowVersionNumber,
            workflowVersionChanges,
        });
    
        await insertWorkflowVersion(newWorkflowVersion);
        await updateWorkflow(workflow);

        return {
            success: true,
            savedWorkflowVersionId: newWorkflowVersion.getId(),
        };
    }
}