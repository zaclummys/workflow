import { findUserById } from "../data/mongodb/user";

export default async function getUserById ({ userId }) {
    const user = await findUserById(userId);

    return {
        name: user.getName(),
        color: user.getColor(),
    };
}