'use server';

import { getSessionToken } from "../cookies";

import executeWorkflowVersion from "~/core/application/execute-workflow-version";

export default async function executeWorkflowVersionAction ({
    inputs,
    workflowVersionId,
}) {
    const sessionToken = await getSessionToken();

    return executeWorkflowVersion({
        inputs,
        workflowVersionId,
        sessionToken,
    });
}