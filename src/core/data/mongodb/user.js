import {
    database, 
} from './client.js';
import {
    User, UserColor, UserPassword, 
} from '../../domain/user.js';

export async function insertUser (user) {
    await database
        .collection('users')
        .insertOne(fromUser(user));
}

export async function findUserById (id) {
    const userData = await database
        .collection('users')
        .findOne({
            id, 
        });
        
    if (userData == null) {
        return null;
    }
    
    return toUser(userData);
}

export async function findUserByEmail (email) {
    const userData = await database
        .collection('users')
        .findOne({
            email, 
        });
        
    if (userData == null) {
        return null;
    }
    
    return toUser(userData);
}

export async function deleteUserById (id) {
    await database
        .collection('users')
        .deleteOne({
            id, 
        });
}

export async function deleteUserByEmail (email) {
    await database
        .collection('users')
        .deleteOne({
            email, 
        });
}


export function toUser (userData) {
    return new User({
        ...userData,
        id: userData.id,
        color: new UserColor(userData.color),
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