import Patrol, { PatrolProps } from "../../entity/Patrol";
import PatrolStop from "../../entity/PatrolStop";
import Team from "../../entity/Team";
import EntityList from "../../valueObject/EntityList";
import UUID from "../../valueObject/UUID";


export interface ICreatePatrolGateway {
    getPatrolStops (patrolStopIds: UUID[]): Promise<EntityList<PatrolStop>>
    getTeam (id: UUID): Promise<Team>
    createPatrol (id: UUID, patrol: PatrolProps): Promise<Patrol>
}
