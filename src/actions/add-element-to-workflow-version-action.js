'use server';

import { revalidatePath } from "next/cache";

import { getSessionToken } from "~/cookies";

import addElementToWorkflowVersion from "~/core/application/add-element-to-workflow-version";

export default async function addElementToWorkflowVersionAction ({
    elementType,
    previousElementId,
    previousElementBranch,
    workflowVersionId,
}) {
    const sessionToken = await getSessionToken();

    const output = await addElementToWorkflowVersion({
        elementType,
        previousElementId,
        previousElementBranch,
        workflowVersionId,
        sessionToken,
    });

    revalidatePath(`/workflow-version/${workflowVersionId}`);

    return output;
}