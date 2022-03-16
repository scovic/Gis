import Patrol from "../../domain/entity/Patrol";
import { ICreatePatrolOutput } from "../../domain/usecase/patrol/CreatePatrolUseCase";
import HttpPresenter from "../core/HttpPresenter/HttpPresenter";
import PatrolPresentation from "../PatrolPresentetation";


export default class CreatePatrolPresenter extends HttpPresenter implements ICreatePatrolOutput {
    public displaySuccess (patrol: Patrol): void {
        const patrolPresentation = PatrolPresentation.present(patrol);
        this.respond({
            status: 201,
            json: patrolPresentation
        });
    }
}
