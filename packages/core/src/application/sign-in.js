import findUserByEmail from "../data/mongodb/find-user-by-email";
import insertSession from "../data/mongodb/insert-session";

export default async function signIn ({ email, password }) {
    const user = findUserByEmail(email);

    if (!user) {
        throw new Exception('The user was not found');
    }

    const passwordIsCorrect = await user.verifyPassword(password);

    if (!passwordIsCorrect) {
        throw new Exception('The password is not correct');
    }

    const session = user.createSession();

    await insertSession(session);

    return {
        sessionId: session.getId(),
    };
}