'use server';

import { revalidatePath } from "next/cache";
import { getSessionToken } from "./cookies";

import editWorkflow from '~/core/application/edit-workflow';

export default async function editWorkflowAction ({
    name,
    description,
    workflowId,
}) {
    const sessionToken = getSessionToken();

    const output = editWorkflow({
        name,
        description,
        workflowId,
        sessionToken,
    });

    revalidatePath(`/workflow/${workflowId}`);

    return output;
}