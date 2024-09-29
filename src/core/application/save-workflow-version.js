import { 
    findWorkflowVersionById,
    updateWorkflowVersion,
} from "~/core/data/mongodb/workflow-version";
import { findSessionByToken } from "../data/mongodb/session";

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

    workflowVersion.change(workflowVersionChanges);

    await updateWorkflowVersion(workflowVersion);

    return {
        success: true
    };
}