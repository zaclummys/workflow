import findSessionByToken from "../data/mongodb/find-session-by-token";

export default async function validateSession ({ sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    return true;
}