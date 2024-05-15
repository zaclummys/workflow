import { randomUUID } from 'crypto';

export class Workflow {
    static create ({
        name,
        description,
        createdById,
        workspaceId,
    }) {
        return new Workflow({
            name,
            description,
            createdById,
            workspaceId,
            id: randomUUID(),
            createdAt: new Date(),
        });
    }

    constructor ({
        id,
        name,
        description,
        workspaceId,
        createdAt,
        createdById,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.workspaceId = workspaceId;
        this.createdAt = createdAt;
        this.createdById = createdById;
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

    getWorkspaceId () {
        return this.workspaceId;
    }

    getCreatedAt () {
        return this.createdAt;
    }

    getCreatedById () {
        return this.createdById;
    }
}