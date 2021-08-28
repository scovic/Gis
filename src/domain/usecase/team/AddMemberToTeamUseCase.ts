import Team from "../../entity/Team";
import { IAddMemberToTeamGateway } from "../../gateway/team/IAddMemberToTeamGateway";

export class AddMemberToTeamInteractorError extends Error {
    constructor (message: string) {
        super (`[AddMemberToTeamInteractor] Error - ${message}`);
    }
}

export type AddMemberToTeamInputData = {
    employeeId: string
    teamId: string
}

export interface IAddMemberToTeamInput {
    addMember (inputData: AddMemberToTeamInputData): Promise<void>
}

export interface IAddMemberToTeamOutput {
    displaySuccess (team: Team): void
    displayError (error: Error): void
}

export default class AddMemberToTeamInteractor implements IAddMemberToTeamInput {
    constructor (
        private output: IAddMemberToTeamOutput,
        private addMemberToTeamGateway: IAddMemberToTeamGateway
    ) {}

    public async addMember (inputData: AddMemberToTeamInputData): Promise<void> {
        try {
            await this.interact(inputData);
        } catch (err) {
            this.output.displayError(err);
        }
    }

    private async interact (inputData: AddMemberToTeamInputData): Promise<void> {
        const employee = await this.addMemberToTeamGateway.getEmployee(inputData.employeeId);
        if (!employee) {
            throw new AddMemberToTeamInteractorError(`Employee with id ${inputData.employeeId} doesn't exists`);
        }
        
        const team = await this.addMemberToTeamGateway.getTeam(inputData.teamId);
        if (!team) {
            throw new AddMemberToTeamInteractorError(`Team with id ${inputData.teamId} doesn't exists`);
        }

        team.addMember(employee);
        this.addMemberToTeamGateway.updateTeam(team);
        this.output.displaySuccess(team);
    }  
}
