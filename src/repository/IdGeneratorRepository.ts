import { IIdGenerator } from "../domain/gateway/IIdGenerator";
import UUID from "../domain/valueObject/UUID";
import {v4 as uuidv4} from "uuid";

export class IdGeneratorError extends Error {
    constructor (message: string) {
        super(`[IdGenerator] Error - ${message}`);
    }
}

export default class IdGeneratorRepository implements IIdGenerator<UUID> {
    public generate (): Promise<UUID> {
        try {
            return Promise.resolve(
                UUID.create(uuidv4())
            );   
        } catch (err: any) {
            throw new IdGeneratorError(err.message);
        }
    }
}
