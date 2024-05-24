import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';
import {
    findUserById, 
} from '~/core/data/mongodb/user';

export default async function getCurrentUser ({ sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            success: false,
            message: 'You must be logged in to get the current user.',
        };
    }

    const currentUser = await findUserById(session.getUserId());

    if (!currentUser) {
        return {
            success: false,
            message: 'User not found.',
        };
    }

    return {
        success: true,
        currentUser: {
            name: currentUser.getName(),
            color: currentUser.getColor(),
        },
    };
}