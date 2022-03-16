import Team from "../../domain/entity/Team";
import { ICreateTeamOutput } from "../../domain/usecase/team/CreateTeamUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import TeamPresentation from "../TeamPresentation";


export default class CreateTeamPresenter extends HttpPresenter implements ICreateTeamOutput {
    displaySuccess (team: Team): void {
        const teamPresentation = TeamPresentation.present(team);
        this.respond({
            status: 201,
            json: teamPresentation
        });
    }
}
