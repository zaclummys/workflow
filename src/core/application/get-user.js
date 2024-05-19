import { findSessionByToken } from '~/core/data/mongodb/session';
import { findUserById } from '../data/mongodb/user';

export default async function getUser ({
    userId,
    sessionToken,
}) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
        };
    }
    
    const user = await findUserById(userId);

    if (!user) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        user: {
            id: user.getId(),
            name: user.getName(),
            color: user.getColor(),
        }
    };
}