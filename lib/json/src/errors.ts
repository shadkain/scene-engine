export class BindError
extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BindError';
    }

    public getMessage(): string {
        return this.message;
    }
}

abstract class ChainError
extends BindError {
    constructor(message: string, next: BindError) {
        super(message + next.getMessage());
    }
}

export class ObjectError
extends ChainError {
    constructor(key: string, next: BindError) {
        super(`"${key}"`, next);
        this.name = 'ObjectError';
    }

    public getMessage(): string {
        return ` -> ${this.message}`;
    }
}

export class ArrayError
extends ChainError {
    constructor(index: number, next: BindError) {
        super(`[${index}]`, next);
        this.name = 'ArrayError';
    }
}

abstract class FinalError
extends BindError {
    public getMessage(): string {
        return `: ${this.message}`;
    }
}

export class PropertyMissingError
extends FinalError {
    constructor(key: string) {
        super(`property for key "${key}" is null or missing`);
        this.name = 'PropertyMissingError';
    }
}

export class WrongInstanceError
extends FinalError {
    constructor(instance: string) {
        super(`property is not an "${instance}"`);
        this.name = 'WrongInstanceError';
    }
}

export class WrongTypeError
extends FinalError {
    constructor(expected: string) {
        super(`property type must be "${expected}"`);
        this.name = 'WrongTypeError';
    }
}

export class WrongTagTypeError
extends FinalError {
    constructor() {
        super(`tag key type must be "string"`);
        this.name = 'WrongTagTypeError';
    }
}

export class NonexistentTagError
extends FinalError {
    constructor(tag: string) {
        super(`no class assosiated with tag "${tag}"`);
        this.name = 'NonexistentTagError';
    }
}

export class BindToAbstractError
extends FinalError {
    constructor(className: string) {
        super(`trying to bind to abstract class "${className}"`);
        this.name = 'BindToAbstractError';
    }
}