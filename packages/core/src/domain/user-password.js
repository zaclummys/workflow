import { hash, verify } from 'argon2';

import DomainError from './domain-error';

export default class UserPassword {
    static async hash (passwordToBeHashed) {
        if (passwordToBeHashed < 8) {
            throw new DomainError('Password must contain at least 8 characters');
        }

        if (passwordToBeHashed > 255) {
            throw new DomainError('Password must contain at maximum of 255 characters');
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
}