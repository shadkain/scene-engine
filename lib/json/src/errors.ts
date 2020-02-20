export class BindError
extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BindError';
    }
}

export class WrongInstanceError
extends BindError {
    constructor(key: string, instance: string) {
        super(`property for key "${key}" is not an ${instance}`);
        this.name = 'WrongInstanceError';
    }
}

export class WrongTypeError
extends BindError {
    constructor(key: string, expected: string, actual: string) {
        super(`property for key "${key}" has wrong type`+'\n'+`expected: "${expected}"`+'\n'+`actual: "${actual}"`);
        this.name = 'WrongTypeError';
    }
}

export class InnerObjectError
extends BindError {
    constructor(key: string, error: BindError) {
        super(`binding inner object for key "${key}" failed`+'\n'+`${error.message}`);
        this.name = 'InnerObjectError';
    }
}