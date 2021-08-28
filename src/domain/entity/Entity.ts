import UniqueEntityId from "../valueObject/UniqueEntityId";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntity = (object: any) => {
    return object instanceof Entity;
};

export default abstract class Entity<I, T> {
    constructor (protected readonly _id: UniqueEntityId<I>, protected props: T) {}

    public isEqual (object?: Entity<I, T>): boolean {
        if (!object) {
            return false;
        }

        if (!isEntity(object)) {
            return false;
        }

        if (object === this) {
            return true;
        }

        return this.id.equals(object.id);
    }

    public get id (): UniqueEntityId<I> { return this._id; }
}
