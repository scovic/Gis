import ValueObject from "./ValueObject";

export class NonEmptyStringError  extends Error {
    constructor (message: string) {
        super(`[NonEmptyString] Error - ${message}`);
    }
}

export default class NonEmptyString extends ValueObject<string> {
    public static create (value: string): NonEmptyString {
        if (!value || value.length === 0) {
            throw new NonEmptyStringError ("value can't be empty string or undefined");
        }
        return new NonEmptyString(value);
    }
    
    private constructor (value: string) {
        super(value);
    }

    isEqual (object: ValueObject<string>): boolean {
        return this.getValue() === object.getValue();
    }
}
