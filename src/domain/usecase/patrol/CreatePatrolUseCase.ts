import Patrol, { PatrolStatus } from "../../entity/Patrol";
import { IIdGenerator } from "../../gateway/IIdGenerator";
import { ICreatePatrolGateway, PatrolInputData } from "../../gateway/patrol/ICreatePatrolGateway";
import TimePeriod from "../../valueObject/TimePeriod";
import UUID from "../../valueObject/UUID";

export const MISSING_STOPS_AND_AREA_PARAM_MESSAGE = "Must provide patrol area or patrol stops for the patrol";
export const BOTH_AREA_AND_STOPS_PRESENT_MESSAGE = "Can't provide both patrol area and patrol stops at the same time";

export class CreatePatrolInteractorError extends Error {
    constructor (message: string) {
        super(`[CreatePatrolInteractor] Error - ${message}`);
    }
}

export type CreatePatrolInputData = {
    teamMembersIds: string[],
    patrolStopIds?: string[]
    patrolAreaId?: string
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
        if (!data.patrolAreaId && !data.patrolStopIds) {
            throw new Error(MISSING_STOPS_AND_AREA_PARAM_MESSAGE);
        }

        if (data.patrolAreaId && data.patrolStopIds) {
            throw new Error(BOTH_AREA_AND_STOPS_PRESENT_MESSAGE);
        }

        const id = await this.idGenerator.generate();
        const period = TimePeriod.create({ from: Number(data.from), to: Number(data.to) });
        const memberIds = data.teamMembersIds.map(teamMemberId => UUID.create(teamMemberId));
        
        const createPatrolInputData: PatrolInputData = {
            period,
            memberIds,
            status: PatrolStatus.PENDING
        };

        if (data.patrolStopIds) {
            createPatrolInputData.stopIds = data.patrolStopIds.map(id => UUID.create(id));
        } 

        if (data.patrolAreaId) {
            createPatrolInputData.areaId = UUID.create(data.patrolAreaId);
        }
        
        const patrol = await this.createPatrolGateway.createPatrol(id, createPatrolInputData);
        this.output.displaySuccess(patrol);
    }
}
