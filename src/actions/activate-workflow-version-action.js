'use server';

import { revalidatePath } from "next/cache";
import { getSessionToken } from "../cookies";

import activateWorkflowVersion from '~/core/application/activate-workflow-version'

export default async function activateWorkflowVersionAction (workflowVersionId) {
    const sessionToken = await getSessionToken();

    const output = activateWorkflowVersion({
        sessionToken,
        workflowVersionId,
    });

    revalidatePath(`/workflow-version/${workflowVersionId}`);

    return output;
}