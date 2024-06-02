'use server';

import { revalidatePath } from "next/cache";
import { getSessionToken } from "./cookies";

import deactivateWorkflowVersion from '~/core/application/deactivate-workflow-version'

export default async function deactivateWorkflowVersionAction (workflowVersionId) {
    const sessionToken = getSessionToken();

    const output = deactivateWorkflowVersion({
        sessionToken,
        workflowVersionId,
    });

    revalidatePath(`/workflow-version/${workflowVersionId}`);

    return output;
}