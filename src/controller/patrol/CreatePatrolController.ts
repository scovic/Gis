import { Response } from "express";
import CreatePatrolInteractor, { CreatePatrolInputData } from "../../domain/usecase/patrol/CreatePatrolUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import CreatePatrolPresenter from "../../presenter/patrol/CreatePatrolPresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class CreatePatrolController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async createPatrol (input: CreatePatrolInputData, res: Response): Promise<void> {
        await new CreatePatrolInteractor(
            new CreatePatrolPresenter(new HttpEmitter(res)),
            this.repositoryFactory.getIdGeneratorRepository(),
            this.repositoryFactory.getCreatePatrolRepository()
        ).createPatrol(input);
    }
}
