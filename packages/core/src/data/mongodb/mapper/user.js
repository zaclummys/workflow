import { User, UserPassword } from '../../../domain/user';

export function toUser (userData) {
    if (userData == null) {
        throw new Error('Expected user data');
    }

    return new User({
        ...userData,
        password: new UserPassword(userData.password),
    });
}

export function fromUser (user) {
    return {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        color: user.getColor(),
    };
}