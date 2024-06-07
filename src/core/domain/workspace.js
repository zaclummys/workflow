import {
    randomUUID, 
} from 'crypto';

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
                WorkspaceMember.create({
                    userId,
                }),
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
        if (!members || members.length === 0) {
            throw new Error('Workspace must have at least one member');
        }
        
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

    setName (name) {
        if (!name) {
            throw new Error('Workspace name is required');
        }

        this.name = name;
    }

    setDescription (description) {
        if (!description) {
            throw new Error('Workspace description is required');
        }
        
        this.description = description;
    }

    /**
     * Checks if a user is the owner of the workspace.
     * 
     * @param {string} userId 
     * @returns 
     */
    isOwner (userId) {
        return userId === this.createdById;
    }

    /**
     * Checks if a user belongs to the workspace.
     * 
     * @param {string} userId 
     * @returns boolean
     */
    isMember (userId) {
        return this.members.some(member => {
            return userId === member.getUserId();
        });
    }

    addMember (userId) {
        if (!this.isMember(userId)) {
            const memberToBeAdded = WorkspaceMember.create({ userId });

            this.members.push(memberToBeAdded);
        }
    }

    removeMember (userId) {
        if (!this.isOwner(userId)) {
            this.members = this.members.filter(member => userId !== member.getUserId());
        }
    }
}

export class WorkspaceMember {
    static create ({ userId }) {
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