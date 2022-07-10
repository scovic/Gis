import { Response } from "express";
import GetPatrolAreasInteractor from "../../domain/usecase/patrol/GetPatrolAreasUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import GetPatrolAreasPreseter from "../../presenter/patrol/GetPatrolAreaPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";

export default class GetPatrolAreasController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async getPatrolAreas (res: Response): Promise<void> {
        await new GetPatrolAreasInteractor(
            new GetPatrolAreasPreseter(new HttpEmitter(res)),
            this.repositoryFactory.getGetPatrolAreaRepository(),
        ).getPatrolAreas();
    }
}
