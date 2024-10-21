'use server';

import { revalidatePath } from 'next/cache';
import { getSessionToken } from '../cookies';

import addMemberToWorkspace from '~/core/application/add-member-to-workspace';

export default async function addMemberToWorkspaceAction ({ email, workspaceId }) {
    const sessionToken = await getSessionToken();

    const output = await addMemberToWorkspace({
        email,
        workspaceId,
        sessionToken,
    });

    revalidatePath(`/workspace/${workspaceId}`);

    return output;
}