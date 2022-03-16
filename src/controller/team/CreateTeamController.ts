import { Response } from "express";
import CreateTeamInteractor, { CreateTeamInputData } from "../../domain/usecase/team/CreateTeamUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import CreateTeamPresenter from "../../presenter/team/CreateTeamPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class CreateTeamController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async createTeam (input: CreateTeamInputData, res: Response): Promise<void> {
        await new CreateTeamInteractor(
            new CreateTeamPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getIdGeneratorRepository(),
            this.repositoryFactory.getCreateTeamRepository()
        ).createTeam(input);
    }
}
