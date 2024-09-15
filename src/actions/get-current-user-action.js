'use server';

import getCurrentUser from '~/core/application/get-current-user';
import {
    getSessionToken, 
} from '~/cookies';

export default async function getCurrentUserAction () {
    const sessionToken = getSessionToken();

    const { currentUser } = await getCurrentUser({
        sessionToken, 
    });

    if (!currentUser) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        currentUser,
    };
}
