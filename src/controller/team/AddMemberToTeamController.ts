import { Response } from "express";
import AddMemberToTeamInteractor, { AddMemberToTeamInputData } from "../../domain/usecase/team/AddMemberToTeamUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import AddMemberToTeamPresenter from "../../presenter/team/AddMemberToTeamPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class AddMemberToTeamController {
    constructor (private repositoryFactory: RepositoryFactory) { }

    public async addMemberToTeam (input: AddMemberToTeamInputData, res: Response): Promise<void> {
        await new AddMemberToTeamInteractor(
            new AddMemberToTeamPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getAddMemberToTeamRepository()
        ).addMember(input);
    }
}
