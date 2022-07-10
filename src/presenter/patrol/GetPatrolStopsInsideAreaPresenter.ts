import PatrolStop from "../../domain/entity/PatrolStop";
import { IGetPatrolStopsInsideAreaOutput } from "../../domain/usecase/patrol/GetPatrolStopsInsideAreaUseCase";
import EntityList from "../../domain/valueObject/EntityList";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolStopPresentation from "../PatrolStopPresentation";

export default class GetPatrolStopsInsideAreaPresenter extends HttpPresenter implements IGetPatrolStopsInsideAreaOutput {
    public displaySuccess (patrolStops: EntityList<PatrolStop>): void {
        const patrolStopsPresnetation = patrolStops.getValue().map(
            patrolStop => PatrolStopPresentation.present(patrolStop)
        );
        this.respond({
            status: 200,
            json: patrolStopsPresnetation
        });
    }
}
