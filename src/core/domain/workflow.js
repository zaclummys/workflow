import {
    randomUUID, 
} from 'crypto';

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
            nextVersionNumber: 1,
            createdAt: new Date(),
        });
    }

    constructor ({
        id,
        name,
        description,
        nextVersionNumber,
        workspaceId,
        createdAt,
        createdById,
    }) {
        if (!id) {
            throw new Error('ID is required');
        }

        if (!name) {
            throw new Error('Name is required');
        }

        if (!nextVersionNumber) {
            throw new Error('Next Version Number is required');
        }

        if (!workspaceId) {
            throw new Error('Workspace ID is required');
        }

        if (!createdById) {
            throw new Error('Created by ID is required');
        }

        if (!createdAt) {
            throw new Error('Created At is required');
        }

        this.id = id;
        this.name = name;
        this.description = description;
        this.nextVersionNumber = nextVersionNumber;
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

    getNextVersionNumber () {
        return this.nextVersionNumber;
    }

    takeNextVersionNumber () {
        const nextVersionNumber = this.nextVersionNumber;

        this.nextVersionNumber += 1;

        return nextVersionNumber;
    }

    setName (name) {
        this.name = name;
    }

    setDescription (description) {
        this.description = description
    }
}