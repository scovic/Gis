import { Response } from "express";
import ListTeamsInteractor from "../../domain/usecase/team/ListTeamsUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import ListTeamsPresenter from "../../presenter/team/ListTeamsPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class ListTeamsController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async listTeams (res: Response): Promise<void> {
        await new ListTeamsInteractor(
            new ListTeamsPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getListTeamsRepository()
        ).listTeams();
    }
}
