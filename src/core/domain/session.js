import {
    randomUUID, randomBytes, 
} from 'crypto';

export class Session {
    static create ({ userId }) {
        return new Session({
            userId,

            id: randomUUID(),
            token: SessionToken.create(),
        });
    }

    constructor ({
        id,
        token,
        userId,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (!token) {
            throw new Error('Token is required.');
        }

        if (!userId) {
            throw new Error('User ID is required.');
        }
        
        this.id = id;
        this.token = token;
        this.userId = userId;
    }

    getId () {
        return this.id;
    }

    getToken () {
        return this.token.toString();
    }

    getUserId () {
        return this.userId;
    }
}

export class SessionToken {
    static create () {
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