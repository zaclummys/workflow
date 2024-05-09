import { Session } from '../../../domain/session';

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