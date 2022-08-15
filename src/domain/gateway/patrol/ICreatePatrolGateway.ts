import Patrol, { PatrolStatus } from "../../entity/Patrol";
import TimePeriod from "../../valueObject/TimePeriod";
import UUID from "../../valueObject/UUID";

export type PatrolInputData = {
    memberIds: UUID[]
    stopIds?: UUID[]
    areaId?: UUID
    period: TimePeriod
    status: PatrolStatus
}

export interface ICreatePatrolGateway {
    createPatrol (id: UUID, patrol: PatrolInputData): Promise<Patrol>
}
