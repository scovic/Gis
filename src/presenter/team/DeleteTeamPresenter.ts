import { IDeleteTeamOutput } from "../../domain/usecase/team/DeleteTeamUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";

export default class DeleteTeamPresenter extends HttpPresenter implements IDeleteTeamOutput {
    displaySuccess (): void {
        this.respond({
            status: 204
        });
    }
}
