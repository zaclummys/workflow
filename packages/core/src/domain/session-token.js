import { randomBytes } from 'crypto';

export default class SessionToken {
    static generate () {
        const string = randomBytes(256).toString('hex');

        return new SessionToken(string);
    }

    constructor (string) {
        this.string = string;
    }
}