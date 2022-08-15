
import { DatabaseEmployeeData, IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import Employee, { EmployeeProps } from "../../domain/entity/Employee";
import { IEmployeeGateway } from "../../domain/gateway/employee/IEmployeeGateway";
import NonEmptyString from "../../domain/valueObject/NonEmptyString";
import UUID from "../../domain/valueObject/UUID";

export class EmployeeRepositoryError extends Error {
    constructor (message: string) {
        super(`[EmployeeRepository] Error - ${message}`);
    }
}

export default class EmployeeRepository implements IEmployeeGateway {
    constructor (private _datasource: IEmployeeDataSource) {}

    public async createEmployee (id: UUID, props: EmployeeProps): Promise<Employee> {
        try {
            const row = await this._datasource.createEmployee({
                id: id.getId(),
                firstName: props.firstName.getValue(),
                lastName: props.lastName.getValue()
            });
            return this.makeEmployee(row);
        } catch (err: any) {
            throw new EmployeeRepositoryError(`[createEmployee] - ${err.message}`);
        }
    }

    private makeEmployee (dbEmployee: DatabaseEmployeeData): Employee {
        return new Employee(
            UUID.create(dbEmployee.id),
            { 
                firstName: NonEmptyString.create(dbEmployee.firstName), 
                lastName: NonEmptyString.create(dbEmployee.lastName)
            }
        );
    }
}
