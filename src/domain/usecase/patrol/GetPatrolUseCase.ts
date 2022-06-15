import Patrol from "../../entity/Patrol";
import { IGetPatrolGateway } from "../../gateway/patrol/IGetPatrolGateway";
import UUID from "../../valueObject/UUID";

export class GetPatrolInteractorError extends Error {
    constructor (message: string) {
        super(`[GetPatrolInteractor] Error - ${message}`);
    }
}

export type GetPatrolInputData = {
    id: string
}

export interface IGetPatrolInput {
    getPatrol(data: GetPatrolInputData): Promise<void>
}

export interface IGetPatrolOutput {
    displaySuccess (patrol: Patrol): void
    displayError (error: Error): void
}

export default class GetPatrolInteractor implements IGetPatrolInput {
    constructor (
        private output: IGetPatrolOutput,
        private getPatrolGateway: IGetPatrolGateway
    ) {}

    public async getPatrol (data: GetPatrolInputData): Promise<void> {
        try {
            return this.interact(data);
        } catch (err: any) {
            this.output.displayError(err);
        }
    }

    private async interact (data: GetPatrolInputData): Promise<void> {
        const patrol = await this.getPatrolGateway.getPatrol(UUID.create(data.id));
        this.output.displaySuccess(patrol);
    }
}
