import PatrolArea from "../../entity/PatrolArea";
import { IGetPatrolAreasGateway } from "../../gateway/patrol/IGetPatrolAreasGateway";
import EntityList from "../../valueObject/EntityList";

export class GetPatrolAreasInteractorError extends Error {
    constructor (message: string) {
        super(`[GetPatrolAreasInteractor] Error - ${message}`);
    }
}

export interface IGetPatrolAreasInput {
    getPatrolAreas (): Promise<void>
}

export interface IGetPatrolAreasOutput {
  displaySuccess (patrolAreas: EntityList<PatrolArea>): void
  displayError (error: Error): void
}

export default class GetPatrolAreasInteractor implements IGetPatrolAreasInput {
    constructor (
    private output: IGetPatrolAreasOutput,
    private gateway: IGetPatrolAreasGateway
    ) { }
 
    public async getPatrolAreas (): Promise<void> {
        try {
            await this.interact();
        } catch (err: any) {
            this.output.displayError(
                new GetPatrolAreasInteractorError(err.message)
            );
        }
    }

    private async interact (): Promise<void> {
        const patrolAreas = await this.gateway.getPatrolAreas();
        this.output.displaySuccess(EntityList.create(patrolAreas));
    }
}
