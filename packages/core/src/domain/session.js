import SessionToken from "./session-token";

export default class Session {
    static create ({ userId }) {
        const token = SessionToken.generate();

        return new Session({
            token,
            userId,
        });
    }

    constructor ({
        token,
        userId,
    }) {
        this.token = token;
        this.userId = userId;
    }
}