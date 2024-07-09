'use server';

import { getSessionToken } from "./cookies";

import addElementToWorkflowVersion from "~/core/application/add-element-to-workflow-version";

export default async function addElementToWorkflowVersionAction ({
    elementData,
    referenceElementId,
    referenceBranchType,
    workflowVersionId,
}) {
    const sessionToken = getSessionToken();

    return addElementToWorkflowVersion({
        elementData,
        referenceElementId,
        referenceBranchType,
        workflowVersionId,
        sessionToken,
    });
}