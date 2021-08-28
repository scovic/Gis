import UniqueEntityId from "./UniqueEntityId";
import ValueObject from "./ValueObject";

export class UUIDError extends Error {
    constructor (message: string) {
        super(`[UUID] Error - ${message}`);
    }
}

export default class UUID extends ValueObject<string> implements UniqueEntityId<string> {
    public static create (uuid: string): UUID {
        if (!this.isValid(uuid)) {
            throw new UUIDError(`string ${uuid} is not valid uuid`);
        }
        return new UUID(uuid);
    }

    private static isValid (uuid: string): boolean {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        return regexExp.test(uuid);
    }

    private constructor (uuid: string) {
        super(uuid);
    }

    getId (): string {
        return this.getValue();
    }

    public isEqual (object?: ValueObject<string>): boolean {
        if (!object) { return false; }
        return this.getValue() === object?.getValue();
    }

    public equals (id: UniqueEntityId<string>): boolean {
        return this.getId() === id.getId();
    }
}
