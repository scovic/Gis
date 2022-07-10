import Patrol, { PatrolStatus } from "../../entity/Patrol";
import { IGetPatrolGateway } from "../../gateway/patrol/IGetPatrolGateway";
import { IUpdatePatrolStatusGateway } from "../../gateway/patrol/IUpdatePatrolStatusGateway";
import UUID from "../../valueObject/UUID";

export class UpdatePatrolStatusInteractorError extends Error {
    constructor (message: string) {
        super(`[UpdatePatrolStatusInteractor] Error - ${message}`);
    }
}

export type UpdatePatrolStatusInputData = {
    patrolId: string
    status: PatrolStatus
}

export interface IUpdatePatrolStatusInput {
    updatePatrolStatus (data: UpdatePatrolStatusInputData): Promise<void>
}

export interface ICreatePatrolOutput {
    displaySuccess (patrol: Patrol): void
    displayError (error: Error): void
}

export default class UpdatePatrolStatusInteractor implements IUpdatePatrolStatusInput {
    constructor (
        private output: ICreatePatrolOutput,
        private getPatrolGateway: IGetPatrolGateway,
        private updatePatrolStatusGateway: IUpdatePatrolStatusGateway
    ) {}

    public async updatePatrolStatus (data: UpdatePatrolStatusInputData): Promise<void> {
        try {
            await this.interact(data);
        } catch (err: any) {
            this.output.displayError(
                new UpdatePatrolStatusInteractorError(err.message)
            );
        }
    }

    private async interact (data: UpdatePatrolStatusInputData): Promise<void> {
        const patrol = await this.getPatrolGateway.getPatrol(UUID.create(data.patrolId));
        patrol.updateStatus(data.status);
        await this.updatePatrolStatusGateway.updatePatrol(patrol);
        this.output.displaySuccess(patrol);
    }
}
