import Employee, { EmployeeProps } from "../../entity/Employee";

export interface IEmployeeGateway {
    createEmployee (id: string, employee: EmployeeProps): Promise<Employee>
}
