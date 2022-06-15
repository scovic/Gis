import Patrol from "../../domain/entity/Patrol";
import { IGetPatrolOutput } from "../../domain/usecase/patrol/GetPatrolUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";

export default class GetPatrolPresenter extends HttpPresenter implements IGetPatrolOutput {
    public displaySuccess (patrol: Patrol): void {
        const patrolPresentation = PatrolPresentation.present(patrol);
        this.respond({
            status: 200,
            json: patrolPresentation
        });
    }
}
