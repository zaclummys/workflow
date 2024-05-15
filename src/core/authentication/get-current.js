import { findSessionByToken } from "../data/mongodb/session";
import { findUserById } from "../data/mongodb/user";

export default async function getCurrentUserId (sessionToken) {
    if (!sessionToken) {
        return null;
    }

    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return null;
    }

    return session.getUserId();
}