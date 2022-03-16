

export type DatabaseEmployeeInput = {
    id: string
    firstName: string
    lastName: string
}

export type DatabaseEmployeeData = {
    id: string
    firstName: string
    lastName: string
}

export interface IEmployeeDataSource {
    createEmployee (input: DatabaseEmployeeInput): Promise<DatabaseEmployeeData>
    getEmployees (): Promise<DatabaseEmployeeData[]>
    getEmployee (id: string): Promise<DatabaseEmployeeData>
    updateEmployee (inputData: DatabaseEmployeeData): Promise<DatabaseEmployeeData>
    deleteEmployee (id: string): Promise<void>
}
