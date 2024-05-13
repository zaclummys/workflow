import { randomUUID } from 'crypto';

export class Workspace {
    static create ({
        name,
        description,
        userId,
    }) {
        return new Workspace({
            id: randomUUID(),
            name,
            description,
            createdAt: new Date(),
            createdById: userId,
            members: [
                WorkspaceMember.create({ userId }),
            ],
        });
    }

    constructor ({
        id,
        name,
        description,
        createdAt,
        createdById,
        members,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.createdById = createdById;
        this.members = members;
    }

    getId () {
        return this.id;
    }

    getName () {
        return this.name;
    }

    getDescription () {
        return this.description;
    }

    getCreatedAt () {
        return this.createdAt;
    }

    getCreatedById () {
        return this.createdById;
    }

    getMembers () {
        return this.members;
    }

    addMember () {}
    removeMember () {}
}

export class WorkspaceMember {
    static create ({
        userId
    }) {
        return new WorkspaceMember({
            userId,
            addedAt: new Date(),
        });
    }

    constructor ({
        userId,
        addedAt,
    }) {
        this.userId = userId;
        this.addedAt = addedAt;
    }

    getUserId () {
        return this.userId;
    }

    getAddedAt () {
        return this.addedAt;
    }
}