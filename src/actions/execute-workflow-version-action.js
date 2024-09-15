'use server';

import { getSessionToken } from "../cookies";

import executeWorkflowVersion from "~/core/application/execute-workflow-version";

export default async function executeWorkflowVersionAction ({
    workflowVersionId,
    inputValues,
}) {
    const sessionToken = getSessionToken();

    return executeWorkflowVersion({
        workflowVersionId,
        inputValues,
        sessionToken,
    });
}