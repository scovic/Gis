import { IGetPatrolStopsGateway } from "../../gateway/patrol/IGetPatrolStopsGateway";
import PatrolStopList from "../../valueObject/PatrolStopList";

export class GetPatrolStopsInteractorError extends Error {
    constructor (message: string) {
        super(`[GetPatrolStopsInteractor] Error - ${message}`);
    }
}
export interface IGetPatrolStopsInput {
    getPatrolStops (): Promise<void>
}

export interface IGetPatrolStopsOutput {
  displaySuccess (patrolStops: PatrolStopList): void
  displayError (error: Error): void
}

export default class GetPatrolStopsInteractor implements IGetPatrolStopsInput {
    constructor (
    private output: IGetPatrolStopsOutput,
    private gateway: IGetPatrolStopsGateway
    ) { }
 
    public async getPatrolStops (): Promise<void> {
        try {
            await this.interact();
        } catch (err: any) {
            this.output.displayError(
                new GetPatrolStopsInteractorError(err.message)
            );
        }
    }

    private async interact (): Promise<void> {
        const patrolStops = await this.gateway.getPatrolStops();
        this.output.displaySuccess(
            PatrolStopList.create(patrolStops)
        );
    }
}
