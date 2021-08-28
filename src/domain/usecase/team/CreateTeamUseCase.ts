import Team from "../../entity/Team";
import { ICreateTeamGateway } from "../../gateway/team/ICreateTeamGateway";
import { IIdGenerator } from "../../gateway/IIdGenerator";
import EmployeeList from "../../valueObject/EmployeeList";
import UUID from "../../valueObject/UUID";

export class CreateTeamInteractorError extends Error {
    constructor (message: string) {
        super(`[CreateTeamInteractor] Error - ${message}`);
    }
}

export type CreateTeamInputData = {
    employees?: EmployeeList
}

export interface ICreateTeamInput {
    createTeam (inputData: CreateTeamInputData): Promise<void>
}

export interface ICreateTeamOutput {
    displaySuccess (team: Team): void
    displayError (error: Error): void
}

export default class CreateTeamInteractor implements ICreateTeamInput {
    constructor (
        private output: ICreateTeamOutput,
        private idGenerator: IIdGenerator<UUID>,
        private createTeamGateway: ICreateTeamGateway
    ) {}

    public async createTeam (inputData: CreateTeamInputData): Promise<void> {
        try {
            await this.interact(inputData);
        } catch (err) {
            this.output.displayError(new CreateTeamInteractorError(err.message));
        }
    }

    private async interact (inputData: CreateTeamInputData): Promise<void> {
        const uuid = await this.idGenerator.generate();
        const employees = inputData.employees || EmployeeList.create([]);
        const createdTeam = await this.createTeamGateway.createTeam(uuid.getId(), employees);
        this.output.displaySuccess(createdTeam);
    }
}
