import Patrol, { PatrolStatus } from "../../entity/Patrol";
import { IIdGenerator } from "../../gateway/IIdGenerator";
import { ICreatePatrolGateway } from "../../gateway/patrol/ICreatePatrolGateway";
import TimePeriod from "../../valueObject/TimePeriod";
import UUID from "../../valueObject/UUID";

export class CreatePatrolInteractorError extends Error {
    constructor (message: string) {
        super(`[CreatePatrolInteractor] Error - ${message}`);
    }
}

export type CreatePatrolInputData = {
    team: string,
    patrolStops: string[]
    from: number | string
    to: number | string
}

export interface ICreatePatrolInput {
    createPatrol(data: CreatePatrolInputData): Promise<void>
}

export interface ICreatePatrolOutput {
    displaySuccess (patrol: Patrol): void
    displayError (error: Error): void
}

export default class CreatePatrolInteractor implements ICreatePatrolInput {
    constructor (
        private output: ICreatePatrolOutput,
        private idGenerator: IIdGenerator<UUID>,
        private createPatrolGateway: ICreatePatrolGateway
    ) {}

    public async createPatrol (data: CreatePatrolInputData): Promise<void> {
        try {
            await this.interact(data);
        } catch (err: any) {
            this.output.displayError(
                new CreatePatrolInteractorError(err.message ?? err)
            );
        }
    }

    private async interact (data: CreatePatrolInputData): Promise<void> {
        const patrolStopIds = data.patrolStops.map(id => UUID.create(id));
        const id = await this.idGenerator.generate();
        const patrolStops = await this.createPatrolGateway.getPatrolStops(
            patrolStopIds
        );
        const team = await this.createPatrolGateway.getTeam(UUID.create(data.team));
        
        const patrol = await this.createPatrolGateway.createPatrol(
            id,
            {
                period: TimePeriod.create({ from: data.from, to: data.to }),
                stops: patrolStops,
                team: team,
                status: PatrolStatus.PENDING
            }
        );

        this.output.displaySuccess(patrol);
    }
}
