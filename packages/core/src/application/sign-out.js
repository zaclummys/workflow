import { deleteSessionByToken } from '../data/mongodb/session';

export default async function signOut ({ sessionToken }) {
    await deleteSessionByToken(sessionToken);
}