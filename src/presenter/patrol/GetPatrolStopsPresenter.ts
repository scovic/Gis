import { IGetPatrolStopsOutput } from "../../domain/usecase/patrol/GetPatrolStopsUseCase";
import PatrolStopList from "../../domain/valueObject/PatrolStopList";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolStopPresentation from "../PatrolStopPresentation";

export default class GetPatrolStopsPresenter extends HttpPresenter implements IGetPatrolStopsOutput {
    public displaySuccess (patrolStops: PatrolStopList): void {
        const patrolStopPresentations = patrolStops.getValue().map(patrolStop => (
            PatrolStopPresentation.present(patrolStop)
        ));
        this.respond({
            status: 200,
            json: patrolStopPresentations
        });
    }
    
}
