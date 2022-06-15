import { Response } from "express";
import GetPatrolInteractor, { GetPatrolInputData } from "../../domain/usecase/patrol/GetPatrolUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import GetPatrolPresenter from "../../presenter/patrol/GetPatrolPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class GetPatrolController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async getPatrol (input: GetPatrolInputData, res: Response): Promise<void> {
        await new GetPatrolInteractor(
            new GetPatrolPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getGetPatrolRepository()
        ).getPatrol(input);
    }
}
