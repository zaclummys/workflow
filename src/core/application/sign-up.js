import {
    insertUser,
    findUserByEmail, 
} from '~/core/data/mongodb/user';

import { insertWorkspace } from '~/core/data/mongodb/workspace';

import {
    User, 
} from '~/core/domain/user';

export default async function signUp ({
    name,
    email,
    password,
}) {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return {
            success: false,
            message: 'The email is already being used.',
        };
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const personalWorkspace = user.createPersonalWorkspace();

    await insertUser(user);
    await insertWorkspace(personalWorkspace);

    return {
        success: true,
        userId: user.getId(),
    };
}