import {
    findUserById, 
} from '../data/mongodb/user';

export default async function getUser ({ userId }) {
    const user = await findUserById(userId);

    if (!user) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        user: {
            id: user.getId(),
            name: user.getName(),
            color: user.getColor(),
        },
    };
}