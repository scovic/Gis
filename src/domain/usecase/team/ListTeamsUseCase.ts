import { IListItemsGateway } from "../../gateway/team/IListTeamsGateway";
import TeamList from "../../valueObject/TeamList";

export class ListTeamsInteractorError extends Error {
    constructor (message: string) {
        super(`[ListTeamsInteractor] Error - ${message}`);
    }
}

export interface IListTeamsInput {
    listTeams (): Promise<void>
}

export interface IListTeamsOutput {
    displaySuccess (teams: TeamList): void
    displayError (error: Error): void
}

export default class ListTeamsInteractor implements IListTeamsInput {
    constructor (
        private output: IListTeamsOutput,
        private listTeamsGateway: IListItemsGateway
    ) {}

    public async listTeams (): Promise<void> {
        try {
            await this.interact();
        } catch (err) {
            this.output.displayError(
                new ListTeamsInteractorError(err.message)
            );
        }
    }

    private async interact (): Promise<void> {
        const teams = await this.listTeamsGateway.getTeams();
        this.output.displaySuccess(teams);
    }
}
