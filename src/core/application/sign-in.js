import { findUserByEmail } from '../data/mongodb/user';
import { insertSession } from '../data/mongodb/session';
import { Session } from '../domain/session';

export default async function signIn ({ email, password }) {
    const user = await findUserByEmail(email);

    if (!user) {
        return {
            success: false,
            message: 'The email is not registered.',
        };
    }

    const isPasswordCorrect = await user.verifyPassword(password);

    if (!isPasswordCorrect) {
        return {
            success: false,
            message: 'The password is not correct.',
        };
    }

    const session = Session.create({
        userId: user.getId(),
    });

    await insertSession(session);

    return {
        success: true,
        sessionToken: session.getToken(),
    };
}