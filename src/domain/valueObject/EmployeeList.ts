import Employee from "../entity/Employee";
import ValueObject from "./ValueObject";

export class EmployeeListError extends Error {
    constructor (message: string) {
        super(`[EmployeeList] Error - ${message}`);
    }
}

export default class EmployeeList extends ValueObject<Employee[]> {
    public static create (list: Employee[]): EmployeeList {
        if (!list) {
            throw new EmployeeListError("List must be valid");
        }
        return new EmployeeList(list);
    }

    private constructor (list: Employee[]) {  
        super (list);
    }

    public getLength (): number {
        return this.getValue().length;
    }


    public find (employee: Employee): Employee | null {
        const foundEmployees = this.getValue().filter(empl => empl.isEqual(employee));
        if (foundEmployees.length === 0) {
            return null;
        }

        return foundEmployees[0];
    }

    public addMember (employee: Employee): void {
        this.getValue().push(employee);
    }


    isEqual (object?: ValueObject<Employee[]>): boolean {
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

