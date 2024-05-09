import { connect } from './client';

import {
    toUser,
    fromUser,
} from './mapper/user';

export async function insertUser (user) {
    const connection = await connect();
    
    await connection
        .collection('users')
        .insertOne(fromUser(user));
}

export async function findUserById (id) {
    const connection = await connect();

    const userData = await connection
        .collection('users')
        .findOne({ id });
        
    if (userData == null) {
        return null;
    }
    
    return toUser(userData);
}

export async function findUserByEmail (email) {
    const connection = await connect();

    const userData = await connection
        .collection('users')
        .findOne({ email });
        
    if (userData == null) {
        return null;
    }
    
    return toUser(userData);
}

export async function deleteUserById (id) {
    const connection = await connect();
    
    await connection
        .collection('users')
        .deleteOne({ id });
}

export async function deleteUserByEmail (email) {
    const connection = await connect();
    
    await connection
        .collection('users')
        .deleteOne({ email });
}