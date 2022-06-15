import Employee, { EmployeeProps } from "../../entity/Employee";
import UUID from "../../valueObject/UUID";

export interface IEmployeeGateway {
    createEmployee (id: UUID, employee: EmployeeProps): Promise<Employee>
}
