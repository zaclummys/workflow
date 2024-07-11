'use server';

import { revalidatePath } from "next/cache";
import { getSessionToken } from "./cookies";

import addElementToWorkflowVersion from "~/core/application/add-element-to-workflow-version";

export default async function addElementToWorkflowVersionAction ({
    elementData,
    previousElementId,
    previousElementBranch,
    workflowVersionId,
}) {
    const sessionToken = getSessionToken();

    const output = addElementToWorkflowVersion({
        elementData,
        previousElementId,
        previousElementBranch,
        workflowVersionId,
        sessionToken,
    });

    revalidatePath(`/workflow-version/${workflowVersionId}`);

    return output;
}