'use server';

import { revalidatePath } from "next/cache";
import { getSessionToken } from "./cookies";

import editWorkspace from '~/core/application/edit-workspace';

export default async function editWorkspaceAction ({ id, name, description }) {
    const sessionToken = getSessionToken();

    const output = editWorkspace({
        id,
        name,
        description,
        sessionToken,
    });

    revalidatePath(`/workspace/${id}`);

    return output;
}