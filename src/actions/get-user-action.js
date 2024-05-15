'use server';

import getUser from '~/core/application/get-user';

export default async function getUserAction (userId) {
    return getUser({ userId });
}
