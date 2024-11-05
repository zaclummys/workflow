import WorkflowNumberValue from '~/core/domain/workflow-version/values/workflow-number-value';
import WorkflowStringValue from '~/core/domain/workflow-version/values/workflow-string-value';
import WorkflowBooleanValue from '~/core/domain/workflow-version/values/workflow-boolean-value';

export default class WorkflowVariable {
    constructor({
        id,
        name,
        type,
        description,
        hasDefaultValue,
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

        if (typeof hasDefaultValue !== 'boolean') {
            throw new Error('Has default value option must be a boolean, received: ' + typeof hasDefaultValue);
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

        if (!markedAsInput && !hasDefaultValue) {
            throw new Error('If a variable is not marked as input, it must have a default value.');
        }

        let defaultValueInstance;
        
        if (hasDefaultValue) {
            if (defaultValue != null) {
                switch (type) {
                    case 'number':
                        defaultValueInstance = new WorkflowNumberValue(defaultValue);
                    break;
    
                    case 'string':
                        defaultValueInstance = new WorkflowStringValue(defaultValue);
                    break;
    
                    case 'boolean':
                        defaultValueInstance = new WorkflowBooleanValue(defaultValue);
                    break;
    
                    default:
                        throw new Error(`Invalid type to create a default value: ${type}`);
                }
            } else {
                throw new Error('Default value is required.');
            }
        } else {
            if (defaultValue != null) {
                throw new Error('Default value is not allowed.');
            }
        }

        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.hasDefaultValue = hasDefaultValue;
        this.defaultValue = defaultValueInstance;
        this.markedAsInput = markedAsInput;
        this.markedAsOutput = markedAsOutput;
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

    getHasDefaultValue() {
        return this.hasDefaultValue;
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
