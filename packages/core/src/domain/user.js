import { randomUUID } from 'crypto';
import { hash, verify } from 'argon2';

import { Session } from './session';

export class User {
    static async create ({
        name,
        email,
        password,
    }) {
        return new User({
            name,
            email,
            id: UserId.create(),
            color: UserColor.create(),
            password: await UserPassword.create(password),
        });
    }

    constructor ({
        id,
        name,
        email,
        password,
        color,
    }) {
        this.name = name;
        this.email = email;
        
        this.id = id;
        this.color = color;
        this.password = password;
    }

    verifyPassword (passwordToBeVerified) {
        return this.password.verify(passwordToBeVerified);
    }

    createSession () {
        return Session.create({
            userId: this.id,
        });
    }

    getId () {
        return this.id.toString();
    }

    getName () {
        return this.name;
    }

    getEmail () {
        return this.email;
    }

    getPassword () {
        return this.password.toString();
    }

    getColor () {
        return this.color.toString();
    }
}

export class UserId {
    static create () {
        return new UserId(randomUUID());
    }

    constructor (uuid) {
        this.uuid = uuid;
    }

    toString () {
        return this.uuid;
    }
}

export class UserPassword {
    static async create (passwordToBeHashed) {
        if (passwordToBeHashed.length < 8) {
            throw new Error('Password must contain at least 8 characters');
        }

        if (passwordToBeHashed.length > 255) {
            throw new Error('Password must contain at maximum of 255 characters');
        }

        const hashedPassword = await hash(passwordToBeHashed);

        return new UserPassword(hashedPassword);
    }

    constructor (hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    verify (passwordToBeVerified) {
        return verify(this.hashedPassword, passwordToBeVerified);
    }

    toString () {
        return this.hashedPassword;
    }
}

export class UserColor {
    static create () {
        return new UserColor();
    }
    
    constructor () {
        this.name = 'purple';
    }

    toString () {
        return this.name;
    }
}