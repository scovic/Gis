import Patrol from "../../domain/entity/Patrol";
import { ICreatePatrolOutput } from "../../domain/usecase/patrol/CreatePatrolUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";


export default class UpdatePatrolStatusPresenter extends HttpPresenter implements ICreatePatrolOutput {
    public displayError (error: Error): void {
        let errMsg = error.message;
        if (errMsg.toLowerCase().includes("is not supported")) {
            errMsg = "Bad Parameter - status";
        }
        super.displayError(new Error(errMsg));
    }

    public displaySuccess (patrol: Patrol): void {
        const patrolPresentation = PatrolPresentation.present(patrol);
        this.respond({
            status: 200,
            json: patrolPresentation
        });
    }
}
