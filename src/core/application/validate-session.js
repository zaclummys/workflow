import { findUserById } from '../data/mongodb/user';
import { findSessionByToken, deleteSessionByToken } from '../data/mongodb/session';

export default async function validateSession ({ sessionToken }) {
    if (!sessionToken) {
        return {
            isSessionValid: false,
        };
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            isSessionValid: false,
        };
    }

    const user = await findUserById(session.getUserId());

    if (!user) {
        await deleteSessionByToken(sessionToken);

        return {
            isSessionValid: false,
        };
    }

    return {
        isSessionValid: true,
    };
}