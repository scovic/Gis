import Employee from "../../entity/Employee";
import { IEmployeeGateway } from "../../gateway/employee/IEmployeeGateway";
import { IIdGenerator } from "../../gateway/IIdGenerator";
import NonEmptyString from "../../valueObject/NonEmptyString";
import UUID from "../../valueObject/UUID";

export class CreateEmployeeInteractorError extends Error {
    constructor (message: string) {
        super(`[CreateEmployeeInteractor] Error - ${message}`);
    }
}

export type CreateEmployeeInputData = {
    firstName: string
    lastName: string
}

export interface ICreateEmployeeInput {
  createEmployee (inputData: CreateEmployeeInputData): Promise<void>
}

export interface ICreateEmployeeOutput {
  displaySuccess(employee: Employee): void
  displayError(error: Error): void
}

export default class CreateEmployeeInteractor implements ICreateEmployeeInput {
    constructor (
        private output: ICreateEmployeeOutput,
        private idGenerator: IIdGenerator<UUID>,
        private createEmployeeGateway: IEmployeeGateway
    ) { }
 
    public async createEmployee (inputData: CreateEmployeeInputData): Promise<void> {
        try {
            await this.interact(inputData);
        } catch (err: any) {
            this.output.displayError(
                new CreateEmployeeInteractorError(err.message)
            );
        }
    }

    private async interact (inputData: CreateEmployeeInputData): Promise<void> {
        const id = await this.idGenerator.generate();
        const employee = await this.createEmployeeGateway.createEmployee(
            id,
            {
                firstName: NonEmptyString.create(inputData.firstName),
                lastName:  NonEmptyString.create(inputData.lastName)
            }
        );
        this.output.displaySuccess(employee);
    }
}
