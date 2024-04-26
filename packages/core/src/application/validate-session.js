export default async function validateSession ({
    sessionToken,
    findSessionByToken,
}) {
    const session = await findSessionByToken(sessionToken);

    return true;
}