import { Response } from "express";
import CreateEmployeeInteractor, { CreateEmployeeInputData } from "../../domain/usecase/employee/CreateEmployeeUseCase";
import HttpEmitter from "../../presenter/core/HttpEmitter/HttpEmiter";
import CreateEmployeePresenter from "../../presenter/employee/CreateEmployeePresenter";
import RepositoryFactory from "../../repository/RepositoryFactory";


export default class EmployeeController {
    constructor (private repositoryFactory: RepositoryFactory) {}

    public async createEmployee (input: CreateEmployeeInputData, res: Response): Promise<void> {
        await new CreateEmployeeInteractor(
            new CreateEmployeePresenter(new HttpEmitter(res)),
            this.repositoryFactory.getIdGeneratorRepository(), 
            this.repositoryFactory.getEmployeeRepository()
        ).createEmployee(input);
    }
}
