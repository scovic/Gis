import NonEmptyString from "../valueObject/NonEmptyString";
import UUID from "../valueObject/UUID";
import Entity from "./Entity";


export type EmployeeProps = {
    firstName: NonEmptyString
    lastName: NonEmptyString
}

class Employee extends Entity<string, EmployeeProps> {
    constructor (id: UUID, props: EmployeeProps) {
        super(id, props);
    }

    public get firstName (): NonEmptyString {
        return this.props.firstName;
    }

    public get lastName (): NonEmptyString {
        return this.props.lastName;
    }
}

export default Employee;
