import Patrol from "../../entity/Patrol";
import UUID from "../../valueObject/UUID";

export interface IUpdatePatrolStatusGateway {
    getPatrol (id: UUID): Promise<Patrol>
    updatePatrol (patrol: Patrol): Promise<Patrol>
}
