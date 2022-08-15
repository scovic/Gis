import Patrol from "../../domain/entity/Patrol";
import { IGetPatrolOutput } from "../../domain/usecase/patrol/GetPatrolUseCase";
import { NotFoundError } from "../core/error/Errors";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";

export default class GetPatrolPresenter extends HttpPresenter implements IGetPatrolOutput {
    public displayError (error: Error): void {
        let err = error;

        if (error.message.toLowerCase().includes("not found")) {
            err = new NotFoundError();
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
