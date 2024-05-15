import { findSessionByToken } from '~/core/data/mongodb/session';
import { findUserById } from '~/core/data/mongodb/user';

export default async function getCurrentUser ({ sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }

    const currentUser = await findUserById(session.getUserId());

    if (!currentUser) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        currentUser: {
            id: currentUser.getId(),
            name: currentUser.getName(),
            color: currentUser.getColor(),
        }
    };
}