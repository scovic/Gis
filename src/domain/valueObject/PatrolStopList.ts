import PatrolStop from "../entity/PatrolStop";
import ValueObject from "./ValueObject";

export class PatrolStopListError extends Error {
    constructor (message: string) {
        super(`[PatrolStopList] Error - ${message}`);
    }
}

export default class PatrolStopList extends ValueObject<PatrolStop[]> {
    public static create (list: PatrolStop[]): PatrolStopList {
        if (!list) {
            throw new PatrolStopListError("List must be valid");
        }
        return new PatrolStopList(list);
    }

    private constructor (list: PatrolStop[]) {  
        super (list);
    }

    public getLength (): number {
        return this.getValue().length;
    }


    public find (stop: PatrolStop): PatrolStop | null {
        const foundStops = this.getValue().filter(stp => stp.isEqual(stop));
        if (foundStops.length === 0) {
            return null;
        }

        return foundStops[0];
    }

    public addMember (stop: PatrolStop): void {
        this.getValue().push(stop);
    }


    isEqual (object?: ValueObject<PatrolStop[]>): boolean {
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

