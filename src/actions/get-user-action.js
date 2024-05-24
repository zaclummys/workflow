'use server';

import getUser from '~/core/application/get-user';

import {
    getSessionToken, 
} from './cookies';

export default async function getUserAction (userId) {
    const sessionToken = getSessionToken();

    return getUser({
        userId,
        sessionToken,
    });
}
