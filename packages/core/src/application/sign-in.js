import { findUserByEmail } from '../data/mongodb/user';
import { insertSession } from '../data/mongodb/session';

export default async function signIn ({ email, password }) {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error('The user was not found');
    }

    const passwordIsCorrect = await user.verifyPassword(password);

    if (!passwordIsCorrect) {
        throw new Error('The password is not correct');
    }

    const session = user.createSession();

    await insertSession(session);

    return {
        sessionId: session.getId(),
    };
}