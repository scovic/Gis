import { Response } from "express";
import DeleteTeamInteractor, { DeleteTeamInputData } from "../../domain/usecase/team/DeleteTeamUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import DeleteTeamPresenter from "../../presenter/team/DeleteTeamPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class DeleteTeamController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async deleteTeam (input: DeleteTeamInputData, res: Response): Promise<void> {
        await new DeleteTeamInteractor(
            new DeleteTeamPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getDeleteTeamRepository()
        ).deleteTeam(input);
    }
}
