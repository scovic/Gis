import Team from "../entity/Team";
import ValueObject from "./ValueObject";

export class TeamListError extends Error {
    constructor (message: string) {
        super(`[EmployeeList] Error - ${message}`);
    }
}

export default class TeamList extends ValueObject<Team[]> {
    public static create (list: Team[]): TeamList {
        if (!list) {
            throw new TeamListError("List must be valid");
        }
        return new TeamList(list);
    }
    
    private constructor (list: Team[]) {
        super(list);
    }

    public getLength (): number {
        return this.getValue().length;
    }

    isEqual (object?: ValueObject<Team[]>): boolean {
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
