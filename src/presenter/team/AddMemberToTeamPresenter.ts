import Team from "../../domain/entity/Team";
import { IAddMemberToTeamOutput } from "../../domain/usecase/team/AddMemberToTeamUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import TeamPresentation from "../TeamPresentation";

export default class AddMemberToTeamPresenter extends HttpPresenter implements IAddMemberToTeamOutput {
    displaySuccess (team: Team): void {
        const teamPresentation = TeamPresentation.present(team);
        this.respond({
            status: 204,
            json: teamPresentation
        });
    }
}
