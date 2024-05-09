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
            updatedAt: new Date(),
            members: [
                WorkspaceMember.create({ userId }),
            ]
        });
    }

    constructor ({
        id,
        name,
        description,
        createdAt,
        updatedAt,
        members,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.members = members;
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