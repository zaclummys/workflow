import { findSessionByToken } from '~/core/data/mongodb/session';
import { deleteUserById } from '~/core/data/mongodb/user';

export default async function deleteUser ({
    userId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    if (userId !== session.getUserId()) {
        return {
            success: false,
        };
    }

    await deleteUserById(userId);

    return {
        success: true,
    };
}