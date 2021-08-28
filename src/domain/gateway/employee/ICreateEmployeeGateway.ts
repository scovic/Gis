import Employee, { EmployeeProps } from "../../entity/Employee";

export interface ICreateEmployeeGateway {
    createEmployee (id: string, employee: EmployeeProps): Promise<Employee>
}
