import {
    insertUser,
    findUserByEmail,
} from '../data/mongodb/user';

import { User } from '../domain/user';

export default async function signUp ({
    name,
    email,
    password,
}) {
    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return {
                success: false,
                message: 'The email is already being used.'
            };
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        await insertUser(user);

        return {
            success: true,
            // userId: user.getId(),
        };
    } catch (error) {
        console.error(error);
        
        return {
            success: false,
            message: 'An error occurred. Please try again.'
        };
    }
}