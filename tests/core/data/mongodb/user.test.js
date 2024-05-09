import { User } from '../../../src/domain/user';
import { insertUser, deleteUserById } from '../../../src/data/mongodb/user';

describe.skip('User', async () => {
    const user = await User.create({
        name: 'John Doe',
        email: 'johndoe@acme.org',
        password: '12345678',
    });   

    it('Can create user', async () => {       
        await insertUser(user);
    });

    afterEach(async () => {
        await deleteUserById(user.getId());
    });
});