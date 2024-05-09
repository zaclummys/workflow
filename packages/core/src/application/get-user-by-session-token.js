import { findSessionByToken } from '../data/mongodb/session';
import { findUserById } from '../data/mongodb/user';

export default async function getUserBySessionToken ({ sessionToken }) {
    if (!sessionToken) {
        throw new Error('Session Token cannot be empty');
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        throw new Error('Session not found');
    }

    const user = await findUserById(session.getUserId());

    if (!user) {
        throw new Error(`User not found: ${session.getUserId()}`);
    }

    return {
        id: user.getId(),
        name: user.getName(),
        color: user.getColor(),
    };
}