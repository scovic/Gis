import { Response } from "express";
import UpdatePatrolStatusInteractor, { UpdatePatrolStatusInputData } from "../../domain/usecase/patrol/UpdatePatrolStatusUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import UpdatePatrolStatusPresenter from "../../presenter/patrol/UpdatePatrolStatusPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";

export default class UpdatePatrolStatusController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async updatePatrolStatus (input: UpdatePatrolStatusInputData, res: Response): Promise<void> {
        await new UpdatePatrolStatusInteractor(
            new UpdatePatrolStatusPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getGetPatrolRepository(),
            this.repositoryFactory.getUpdatePatrolStatusRepository()
        ).updatePatrolStatus(input);
    }
}
