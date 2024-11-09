export function createValue ({ type, value }) {
    switch (type) {
        case 'string':
            return {
                type: 'string',
                string: value ?? '',
            };

        case 'number':
            return {
                type: 'number',
                number: value ?? '0',
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: value ?? 'false',
            };
    }
}

function coerceNumber (number) {
    const coercedNumber = Number(number);

    if (isNaN(coercedNumber)) {
        throw new Error('Invalid number value.');
    }

    return coercedNumber;
};

function coerceBoolean (boolean) {
    switch (boolean) {
        case 'true':
            return true;

        case 'false':
            return false;

        default:
            throw new Error(`Invalid boolean value: ${boolean}.`);
    }
};

export function coerceValue (value) {
    if (value == null) {
        return null;
    }

    switch (value.type) {
        case 'string':
            return {
                type: 'string',
                string: value.string,
            };

        case 'number':
            return {
                type: 'number',
                number: coerceNumber(value.number),
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: coerceBoolean(value.boolean),
            };
    }
}

export function decoerceValue (value) {
    if (value == null) {
        return null;
    }

    switch (value.type) {
        case 'string':
            return {
                type: 'string',
                string: value.string.toString(),
            };

        case 'number':
            return {
                type: 'number',
                number: value.number.toString(),
            };

        case 'boolean':
            return {
                type: 'boolean',
                boolean: value.boolean.toString(),
            };
    }
}

