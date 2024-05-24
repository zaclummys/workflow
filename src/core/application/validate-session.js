import {
    findSessionByToken, 
} from '~/core/data/mongodb/session';

import {
    findUserById, 
} from '~/core/data/mongodb/user';

export default async function validateSession ({ sessionToken }) {
    const session = await findSessionByToken(sessionToken);

    if (!session) {
        return {
            isSessionValid: false,
        };
    }

    const user = await findUserById(session.getUserId());

    if (!user) {
        return {
            isSessionValid: false,
        };
    }

    return {
        isSessionValid: true,
    };
}