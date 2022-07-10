import PatrolStop from "../../entity/PatrolStop";
import { IGetPatrolStopsInsideAreaGateway } from "../../gateway/patrol/IGetPatrolStopsInsideAreaGateway";
import EntityList from "../../valueObject/EntityList";
import UUID from "../../valueObject/UUID";

export class GetPatrolStopsInsideAreaInteractorError extends Error {
    constructor (message: string) {
        super(`[GetPatrolStopsInsideAreaInteractor] Error - ${message}`);
    }
}

export type GetPatrolStopsInsideAreaInputData = {
    areaId: string
}

export interface IGetPatrolStopsInsideAreaInput {
  getPatrolStopsInsideArea (inputData: GetPatrolStopsInsideAreaInputData): Promise<void>
}

export interface IGetPatrolStopsInsideAreaOutput {
  displaySuccess (patrolStops: EntityList<PatrolStop>): void
  displayError (error: Error): void
}

export default class GetPatrolStopsInsideAreaInteractor implements IGetPatrolStopsInsideAreaInput {
    constructor (
    private output: IGetPatrolStopsInsideAreaOutput,
    private gateway: IGetPatrolStopsInsideAreaGateway
    ) { }
 
    public async getPatrolStopsInsideArea (inputData: GetPatrolStopsInsideAreaInputData): Promise<void> {
        try {
            await this.interact(inputData);
        } catch (err: any) {
            this.output.displayError(
                new GetPatrolStopsInsideAreaInteractorError(err.message)
            );
        }
    }

    private async interact (inputData: GetPatrolStopsInsideAreaInputData): Promise<void> {
        const patrolStops = await this.gateway.getPatrolStopsInsideArea(UUID.create(inputData.areaId));
        this.output.displaySuccess(EntityList.create(patrolStops));
    }
}
