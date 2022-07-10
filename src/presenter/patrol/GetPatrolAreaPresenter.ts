import PatrolArea from "../../domain/entity/PatrolArea";
import { IGetPatrolAreasOutput } from "../../domain/usecase/patrol/GetPatrolAreasUseCase";
import EntityList from "../../domain/valueObject/EntityList";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolAreaPresentation from "../PatrolAreaPresentation";

export default class GetPatrolAreasPreseter extends HttpPresenter implements IGetPatrolAreasOutput {
    public displaySuccess (patrolAreas: EntityList<PatrolArea>): void {
        const patrolArea = patrolAreas.getValue().map(
            patrolArea => PatrolAreaPresentation.present(patrolArea)
        );
        this.respond({
            status: 200,
            json: patrolArea
        });
    }
}
