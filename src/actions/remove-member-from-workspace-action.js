'use server';

import { revalidatePath } from 'next/cache';
import { getSessionToken } from '../cookies';

import removeMemberFromWorkspace from '~/core/application/remove-member-from-workspace';

export default async function removeMemberFromWorkspaceAction ({ userId, workspaceId }) {
    const sessionToken = getSessionToken();

    const output = await removeMemberFromWorkspace({
        userId,
        workspaceId,
        sessionToken,
    });

    revalidatePath(`/workspace/${workspaceId}`);

    return output;
}