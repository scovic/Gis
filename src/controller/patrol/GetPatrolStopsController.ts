import { Response } from "express";
import GetPatrolStopsInteractor from "../../domain/usecase/patrol/GetPatrolStopsUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import GetPatrolStopsForPatrolPresenter from "../../presenter/patrol/GetPatrolStopsPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";

export default class GetPatrolStopsController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async getPatrolStopsForPatrol (res: Response): Promise<void> {
        await new GetPatrolStopsInteractor(
            new GetPatrolStopsForPatrolPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getGetPatrolStopsForPatrolRepository()
        ).getPatrolStops();
    }
}
