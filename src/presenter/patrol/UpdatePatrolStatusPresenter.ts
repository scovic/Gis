import Patrol from "../../domain/entity/Patrol";
import { ICreatePatrolOutput } from "../../domain/usecase/patrol/CreatePatrolUseCase";
import { BadRequestError } from "../core/error/Errors";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";


export default class UpdatePatrolStatusPresenter extends HttpPresenter implements ICreatePatrolOutput {
    public displayError (error: Error): void {
        let err = error;
        if (error.message.toLowerCase().includes("is not supported")) {
            err = new BadRequestError("Bad Parameter - status");
        }
        super.displayError(err);
    }

    public displaySuccess (patrol: Patrol): void {
        const patrolPresentation = PatrolPresentation.present(patrol);
        this.respond({
            status: 200,
            json: patrolPresentation
        });
    }
}
