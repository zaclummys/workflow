import {
    database, 
} from './client.js';
import {
    Session, 
} from '../../domain/session.js';

export async function insertSession (session) {
    await database
        .collection('sessions')
        .insertOne(fromSession(session));
}

export async function findSessionByToken (token) {
    const sessionData = await database
        .collection('sessions')
        .findOne({
            token, 
        });

    if (sessionData == null) {
        return null;
    }

    return toSession(sessionData);
}

export async function deleteSessionById (id) {
    await database
        .collection('sessions')
        .deleteOne({
            id, 
        });
}

export async function deleteSessionByToken (token) {
    await database
        .collection('sessions')
        .deleteOne({
            token, 
        });
}

export function fromSession (session) {
    return {
        id: session.getId(),
        token: session.getToken(),
        userId: session.getUserId(),
    };
}

export function toSession (sessionData) {
    return new Session(sessionData);
}