import {
    insertUser,
    findUserByEmail,
} from '../data/mongodb/user';

import { User } from '../domain/user';

export default async function signUp ({ name, email, password }) {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error('The email is already being used');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    await insertUser(user);

    return {
        success: true,
    };
}