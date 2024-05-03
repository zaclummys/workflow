import { connect } from './client';

export async function insertSession (session) {
    const connection = await connect();

    await connection
        .collection('sessions')
        .insertOne(fromSession(session));
}