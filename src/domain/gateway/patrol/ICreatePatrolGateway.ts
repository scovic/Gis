import Patrol, { PatrolStatus } from "../../entity/Patrol";
import TimePeriod from "../../valueObject/TimePeriod";
import UUID from "../../valueObject/UUID";

export type PatrolInputData = {
    stopIds: UUID[],
    memberIds: UUID[],
    period: TimePeriod,
    status: PatrolStatus
}

export interface ICreatePatrolGateway {
    createPatrol (id: UUID, patrol: PatrolInputData): Promise<Patrol>
}
