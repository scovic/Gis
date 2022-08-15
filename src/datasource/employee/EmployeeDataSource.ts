
import DatabaseDataSource from "../DatabaseDataSource";
import { DatabaseEmployeeData, IEmployeeDataSource, DatabaseEmployeeInput } from "./IEmployeeDataSource";

export class EmployeeDataSourceError extends Error {
    constructor (message: string) {
        super(`[EmployeeDataSource] Error - ${message}`);
    }
}

export default class EmployeeDataSource extends DatabaseDataSource implements IEmployeeDataSource {
    private readonly _tableName = "employee";

    public async createEmployee (inputData: DatabaseEmployeeInput): Promise<DatabaseEmployeeData> {
        try {
            const [employeeRow] = await this.knex(this._tableName)
                .insert({
                    id: inputData.id,
                    first_name: inputData.firstName,
                    last_name: inputData.lastName
                })
                .returning("*"); 
                
            return this.convertToEmployeeData(employeeRow);
        } catch (err: any) {
            throw new EmployeeDataSourceError(`[createEmployee] - ${err.message}`); 
        }
    }

    public async getEmployees (): Promise<DatabaseEmployeeData[]> {
        try {
            const employeeRows = await this.knex(this._tableName).select("*");
            return employeeRows.map(row => this.convertToEmployeeData(row));
        } catch (err: any) {
            throw new EmployeeDataSourceError(`[getEmployees] - ${err.message}`); 
        }
    }

    public async getEmployeesByIds (ids: string[]): Promise<DatabaseEmployeeData[]> {
        try {
            const employeeRows = await this.knex(this._tableName).whereIn("id", ids);
            return employeeRows.map(
                employeeRow => this.convertToEmployeeData(employeeRow)
            );
        } catch (err: any) {
            throw new EmployeeDataSourceError(`[getEmployeesByIds] - ${err.message}`); 
        }
    }

    public async getEmployee (id: string): Promise<DatabaseEmployeeData> {
        try {
            const row = await this.knex(this._tableName)
                .where({ id });
            return this.convertToEmployeeData(row);
        } catch (err: any) {
            throw new EmployeeDataSourceError(`[getEmployee] - ${err.message}`); 
        }
    }

    public async updateEmployee (inputData: DatabaseEmployeeData): Promise<DatabaseEmployeeData> {
        try {
            const updatedRow = await this.knex(this._tableName)
                .where({ id: inputData.id })
                .update({ 
                    first_name: inputData.firstName, 
                    last_name: inputData.lastName
                })
                .returning("*");
            return this.convertToEmployeeData(updatedRow);
        } catch (err: any) {
            throw new EmployeeDataSourceError(`[updateEmployee] - ${err.message}`); 
        }
    }

    public async deleteEmployee (id: string): Promise<void> {
        try {
            await this.knex(this._tableName).where({ id }).del();
        } catch (err: any) {
            throw new EmployeeDataSourceError(`[deleteEmployee] - ${err.message}`); 
        }
    }

    private convertToEmployeeData (row: any): DatabaseEmployeeData {
        return {
            id: row.id,
            firstName: row.first_name,
            lastName: row.last_name
        };
    }
}
