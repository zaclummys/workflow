export default class WorkflowVariable {
    constructor({
        id,
        name,
        type,
        description,
        defaultValue,
        markedAsInput,
        markedAsOutput,
    }) {
        const validTypes = ['number', 'string', 'boolean'];

        if (!id) {
            throw new Error('ID is required.');
        }

        if (!name) {
            throw new Error('Name is required.');
        }

        if (!type) {
            throw new Error('Type is required.');
        }

        if (!validTypes.includes(type)) {
            throw new Error(`Type must be one of ${validTypes.join(', ')}, got ${type}.`);
        }

        if (defaultValue === undefined) {
            throw new Error('Default value cannot be undefined.');
        }

        if (typeof markedAsInput !== 'boolean') {
            throw new Error('Marked as input option must be a boolean.');
        }

        if (typeof markedAsOutput !== 'boolean') {
            throw new Error('Marked as output option must be a boolean.');
        }

        if (!markedAsInput && defaultValue == null) {
            throw new Error('If a variable is not marked as input, it must have a default value.');
        }

        if (defaultValue != null && type !== typeof defaultValue) {
            throw new Error('Default value type must match the variable type. Found ' + typeof defaultValue + ', expected ' + type + '.');
        }

        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.markedAsInput = markedAsInput;
        this.markedAsOutput = markedAsOutput;
        this.defaultValue = defaultValue;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getDescription() {
        return this.description;
    }

    getDefaultValue() {
        return this.defaultValue;
    }

    getMarkedAsInput() {
        return this.markedAsInput;
    }

    getMarkedAsOutput() {
        return this.markedAsOutput;
    }
}
