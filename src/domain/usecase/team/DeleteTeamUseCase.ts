import Team from "../../entity/Team";
import { IDeleteTeamGateway } from "../../gateway/team/IDeleteTeamGateway";

export class DeleteTeamInteractorError extends Error {
    constructor (message: string) {
        super(`[DeleteTeamInteractor] Error - ${message}`);
    }
}

export type DeleteTeamInputData = {
    teamId: string
}

export interface IDeleteTeamInput {
    deleteTeam (inputData: DeleteTeamInputData): Promise<void>
}

export interface IDeleteTeamOutput {
    displaySuccess (team: Team): void
    displayError (error: Error): void
}

export default class DeleteTeamInteractor implements IDeleteTeamInput {
    constructor (
        private output: IDeleteTeamOutput,
        private deleteTeamGateway: IDeleteTeamGateway
    ) {}

    public async deleteTeam (inputData: DeleteTeamInputData): Promise<void> {
        try {
            await this.interact(inputData);
        } catch (err) {
            this.output.displayError(
                new DeleteTeamInteractorError(err.message)
            );
        }
    }

    private async interact (inputData: DeleteTeamInputData): Promise<void> {
        const team = await this.deleteTeamGateway.getTeam(inputData.teamId);
        await this.deleteTeamGateway.deleteTeam(inputData.teamId);
        this.output.displaySuccess(team);
    }
}
