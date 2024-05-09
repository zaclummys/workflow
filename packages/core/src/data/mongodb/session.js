import { connect } from './client';
import { fromSession, toSession } from './mapper/session';

export async function insertSession (session) {
    const connection = await connect();

    await connection
        .collection('sessions')
        .insertOne(fromSession(session));
}

export async function findSessionByToken (token) {
    const connection = await connect();

    const sessionData = await connection
        .collection('sessions')
        .findOne({ token });

    if (sessionData == null) {
        return null;
    }

    return toSession(sessionData);
}

export async function deleteSessionByToken (token) {
    const connection = await connect();

    await connection
        .collection('sessions')
        .deleteOne({ token });
}