import { findSessionByToken } from "../data/mongodb/session";

export default async function getCurrentUserId (sessionToken) {
    if (!sessionToken) {
        throw new Error('Session Token cannot be empty');
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        throw new Error('Session not found');
    }

    return session.getUserId();
}