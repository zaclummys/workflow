import { User } from '../../src/domain/user';

export function createUser () {
    return User.create({
        name: 'John Doe',
        email: 'johndoe@acme.org',
        password: '12345678',
    });
}