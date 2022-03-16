import Employee from "../../domain/entity/Employee";
import { ICreateEmployeeOutput } from "../../domain/usecase/employee/CreateEmployeeUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import EmployeePresentation from "../EmployeePresentation";

export default class CreateEmployeePresenter extends HttpPresenter implements ICreateEmployeeOutput {
    public displaySuccess (employee: Employee): void {
        this.respond({
            json: EmployeePresentation.present(employee),
            status: 201
        });
    }
}
