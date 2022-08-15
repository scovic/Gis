import Entity from "../entity/Entity";
import ValueObject from "./ValueObject";

export class EntityListError extends Error {
    constructor (message: string) {
        super(`[EntityList] Error - ${message}`);
    }
}

type EntityType = Entity<any, any>;

export default class EntityList <ItemType extends EntityType> extends ValueObject<ItemType[]> {
    public static create <ItemType extends EntityType> (list: ItemType[]): EntityList <ItemType> {
        if (!list) {
            throw new EntityListError("List must be valid");
        }
        return new EntityList(list);
    }

    private constructor (list: ItemType[]) {
        super(list);
    }

    public getLength (): number {
        return this.getValue().length;
    }

    public find (item: ItemType): ItemType | null {
        const foundItems = this.getValue().filter(itm => itm.isEqual(item));
        if (foundItems.length === 0) {
            return null;
        }

        return foundItems[0];
    }

    public isEmpty (): boolean {
        return this.getLength() === 0;
    }

    public addItem (item: ItemType): void {
        this.getValue().push(item);
    }

    isEqual (object?: ValueObject<ItemType[]>): boolean {
        if (!object) { return false; }

        if (object.getValue().length !== this.getLength()) {
            return false;
        }

        let same = true;
        for (let i = 0; i < this.getLength(); i++) {
            if (!this.getValue()[i].isEqual(object.getValue()[i])) {
                same = false;
                break;
            }
        }

        return same;
    }
}
