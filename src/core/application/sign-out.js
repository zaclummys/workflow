import {
    deleteSessionByToken, 
} from '~/core/data/mongodb/session';

export default async function signOut ({ sessionToken }) {
    await deleteSessionByToken(sessionToken);
}