import { IListTeamsOutput } from "../../domain/usecase/team/ListTeamsUseCase";
import TeamList from "../../domain/valueObject/TeamList";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import TeamPresentation from "../TeamPresentation";


export default class ListTeamsPresenter extends HttpPresenter implements IListTeamsOutput {
    displaySuccess (teams: TeamList): void {
        const teamsPresentation = teams.getValue().map(team => TeamPresentation.present(team));
        this.respond({
            status: 200,
            json: teamsPresentation
        });
    }
}
