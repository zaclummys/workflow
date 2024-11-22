export function coerceNumber (number) {
    const coercedNumber = Number(number);
    
    if (Number.isNaN(coercedNumber)) {
        throw new Error(`Unexpected number: ${number}`);
    }
    
    return coercedNumber;
}

export function coerceBoolean (boolean) {
    switch (boolean) {
        case 'true':
            return true;
        
        case 'false':
            return false;
        
        default:
            throw new Error(`Unexpected boolean: ${boolean}`);
    } 
}