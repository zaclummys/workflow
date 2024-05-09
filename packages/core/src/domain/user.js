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
            id: randomUUID(),
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
        if (!hashedPassword) {
            throw new Error('Password cannot be empty');
        }

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
    static colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'indigo',
        'purple',
        'pink',
        'blue',
    ];

    static getRandomColor () {
        return UserColor.colors[Math.floor(Math.random() * UserColor.colors.length)];
    }

    static create () {        
        const randomColor = UserColor.getRandomColor();

        return new UserColor(randomColor);
    }
    
    constructor (name) {
        if (!name) {
            throw new Error('Name cannot be empty');
        }

        if (!UserColor.colors.includes(name)) {
            throw new Error(`Color must be one of the following: ${UserColor.colors.join(', ')}`);
        }

        this.name = name;
    }

    toString () {
        return this.name;
    }
}