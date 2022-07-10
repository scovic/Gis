import { Response } from "express";
import GetPatrolStopsInsideAreaInteractor, { GetPatrolStopsInsideAreaInputData } from "../../domain/usecase/patrol/GetPatrolStopsInsideAreaUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import GetPatrolStopsInsideAreaPresenter from "../../presenter/patrol/GetPatrolStopsInsideAreaPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";

export default class GetPatrolAreasController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async getPatrolStopsInsideArea (input: GetPatrolStopsInsideAreaInputData, res: Response): Promise<void> {
        await new GetPatrolStopsInsideAreaInteractor(
            new GetPatrolStopsInsideAreaPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getGetPatrolStopsInsideAreaRepository(),
        ).getPatrolStopsInsideArea(input);
    }
}
