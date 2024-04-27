import { randomUUID } from 'crypto';
import { Session } from 'inspector';

export default class User {
    static create ({
        name,
        email,
        password,
    }) {
        const id = randomUUID();

        return new User({
            id,
            name,
            email,
            password,
        });
    }

    constructor ({
        id,
        name,
        email,
        password,
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getId () {
        return this.id;
    }

    verifyPassword (passwordToBeVerified) {
        return this.password.verify(passwordToBeVerified);
    }

    createSession () {
        return Session.create({
            userId: this.id,
        });
    }
}

