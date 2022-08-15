import Patrol from "../../domain/entity/Patrol";
import { 
    ICreatePatrolOutput,
    MISSING_STOPS_AND_AREA_PARAM_MESSAGE,
    BOTH_AREA_AND_STOPS_PRESENT_MESSAGE 
} from "../../domain/usecase/patrol/CreatePatrolUseCase";
import { BadRequestError } from "../core/error/Errors";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";

export default class CreatePatrolPresenter extends HttpPresenter implements ICreatePatrolOutput {
    public displayError (error: Error): void {
        let err = error;

        if (error.message.toLowerCase().includes(MISSING_STOPS_AND_AREA_PARAM_MESSAGE.toLowerCase())) {
            err = new BadRequestError("Parameters missing - patrol stops or patrol area");
        }

        if (error.message.toLowerCase().includes(BOTH_AREA_AND_STOPS_PRESENT_MESSAGE.toLowerCase())) {
            err = new BadRequestError("Both patrol stops and patrol area provided");
        }

        super.displayError(err);
    }

    public displaySuccess (patrol: Patrol): void {
        const patrolPresentation = PatrolPresentation.present(patrol);
        this.respond({
            status: 201,
            json: patrolPresentation
        });
    }
}
