import { findUserByEmail } from '../data/mongodb/user';
import { insertSession } from '../data/mongodb/session';

export default async function signIn ({ email, password }) {
    const user = await findUserByEmail(email);

    if (!user) {
        return {
            success: false,
            message: 'The email is not registered.',
        };
    }

    const passwordIsCorrect = await user.verifyPassword(password);

    if (!passwordIsCorrect) {
        return {
            success: false,
            message: 'The password is not correct.',
        };
    }

    const session = user.createSession();

    await insertSession(session);

    return {
        success: true,
        sessionToken: session.getToken(),
    };
}