import Patrol from "../../entity/Patrol";

export interface IUpdatePatrolStatusGateway {
    updatePatrol (patrol: Patrol): Promise<Patrol>
}
