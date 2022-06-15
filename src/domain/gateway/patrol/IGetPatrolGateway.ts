import Patrol from "../../entity/Patrol";
import UUID from "../../valueObject/UUID";

export interface IGetPatrolGateway {
    getPatrol (id: UUID): Promise<Patrol>
}
