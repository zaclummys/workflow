'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionToken } from "~/cookies";
import saveWorkflowVersion from "~/core/application/save-workflow-version";

export default async function saveWorkflowVersionAction ({
    workflowVersionId,
    workflowVersionChanges,
}) {
    const sessionToken = getSessionToken();

    const { success, savedWorkflowVersionId } = await saveWorkflowVersion({
        sessionToken,
        workflowVersionId,
        workflowVersionChanges,
    });

    if (success) {
        if (savedWorkflowVersionId === workflowVersionId) {
            revalidatePath(`/workflow-version/${savedWorkflowVersionId}/editor`);
        } else {
            redirect(`/workflow-version/${savedWorkflowVersionId}/editor`);
        }
    }

    return { success };
}