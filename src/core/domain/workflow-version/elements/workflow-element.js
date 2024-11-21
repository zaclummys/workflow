export default class WorkflowElement {
    constructor ({
        id,
        positionX = 0.0,
        positionY = 0.0,
    }) {
        if (!id) {
            throw new Error('ID is required.');
        }

        if (positionX == null) {
            throw new Error('Position X cannot be null');
        }

        if (positionY == null) {
            throw new Error('Position Y cannot be null');
        }

        this.id = id;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getId () {
        return this.id;
    }

    getPositionX () {
        return this.positionX;
    }

    getPositionY () {
        return this.positionY;
    }

    execute (context) {
        throw new Error(`Not implemented for ${this.constructor.name}.`);
    }
}