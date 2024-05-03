import { createUser } from '../../stubs/user';

import { insertUser } from '../../../src/data/mongodb/user';

describe('User', () => {
    it('Can create user', async () => {
        const user = await createUser();

        await insertUser(user);
    });
});