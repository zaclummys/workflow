'use server';

import { revalidatePath } from "next/cache";
import { getSessionToken } from "~/cookies";
import saveWorkflowVersion from "~/core/application/save-workflow-version";

export default async function saveWorkflowVersionAction ({
    workflowVersionId,
    workflowVersionChanges,
}) {
    const sessionToken = getSessionToken();

    const saveWorkflowVersionOutput = await saveWorkflowVersion({
        sessionToken,
        workflowVersionId,
        workflowVersionChanges,
    });

    if (saveWorkflowVersionOutput.success) {
        revalidatePath(`/workflow-version/${workflowVersionId}`);
        revalidatePath(`/workflow-version/${workflowVersionId}/edit`);
    }

    return saveWorkflowVersionOutput;
}