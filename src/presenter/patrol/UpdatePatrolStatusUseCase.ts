import Patrol from "../../domain/entity/Patrol";
import { ICreatePatrolOutput } from "../../domain/usecase/patrol/CreatePatrolUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";


export default class UpdatePatrolStatusPresenter extends HttpPresenter implements ICreatePatrolOutput {
    public displaySuccess (patrol: Patrol): void {
        const patrolPresentation = PatrolPresentation.present(patrol);
        this.respond({
            status: 200,
            json: patrolPresentation
        });
    }
}
