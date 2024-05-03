import { randomUUID, randomBytes } from 'crypto';

export class Session {
    static create ({ userId }) {
        return new Session({
            userId,

            id: SessionId.create(),
            token: SessionToken.create(),
        });
    }

    constructor ({
        id,
        token,
        userId,
    }) {
        this.id = id;
        this.token = token;
        this.userId = userId;
    }

    getId () {
        return this.id.toString();
    }

    getToken () {
        return this.token.toString();
    }

    getUserId () {
        return this.userId;
    }
}

export class SessionId {
    static create () {
        return new SessionId(randomUUID());
    }

    constructor (uuid) {
        this.uuid = uuid;
    }

    toString () {
        return this.uuid;
    }
}

export class SessionToken {
    static generate () {
        const hex = randomBytes(256).toString('hex');

        return new SessionToken(hex);
    }

    constructor (hex) {
        this.hex = hex;
    }

    toString () {
        return this.hex;
    }
}