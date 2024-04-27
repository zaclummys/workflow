import findUserByEmail from "../data/mongodb/find-user-by-email";
import insertUser from "../data/mongodb/insert-user";
import DomainError from "../domain/domain-error";

import User from "../domain/user";
import UserPassword from "../domain/user-password";

export default async function signUp ({ name, email, password }) {
    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return {
                success: false,
                message: 'The email is already being used',
            };
        }

        const user = User.create({
            name,
            email,
            password: UserPassword.hash(password),
        });

        await insertUser(user);

        return {
            success: true,
        };
    } catch (error) {
        if (error instanceof DomainError) {
            return {
                succes: false,
                message: error.message,
            }
        }

        return {
            success: false,
            message: 'An unexpected error has ocurred.',
        };
    }
}