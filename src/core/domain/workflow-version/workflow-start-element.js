import { randomUUID } from 'crypto';

import { WorkflowElement } from './workflow-element';

export class WorkflowStartElement extends WorkflowElement {
    constructor({
        id, positionX, positionY, nextElementId,
    }) {
        super({ id, positionX, positionY });

        this.nextElementId = nextElementId;
    }

    getType() {
        return 'start';
    }

    getName() {
        return 'Start';
    }

    getNextElementId() {
        return this.nextElementId;
    }

    setNextElementId(nextElementId) {
        this.nextElementId = nextElementId;
    }

    setDefaultNextElementId(nextElementId) {
        this.nextElementId = nextElementId;
    }

    execute() {
        return this.nextElementId;
    }
}
