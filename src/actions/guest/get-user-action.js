'use server';

import getUserById from '~/core/application/get-user-by-id';

export default async function getUserAction (userId) {
    return getUserById({
        sessionToken,
    });
}
