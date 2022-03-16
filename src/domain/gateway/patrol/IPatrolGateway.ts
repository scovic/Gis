import Patrol from "../../entity/Patrol";
import PatrolStop from "../../entity/PatrolStop";
import Team from "../../entity/Team";
import EntityList from "../../valueObject/EntityList";

export interface IPatrolGateway {
    createPatrol (id: string, stops: EntityList<PatrolStop>, team?: Team): Promise<Patrol>
    updatePatrol (id: string, patrol: Patrol): Promise<Patrol>
    removePatrol (id: string): Promise<void>
}
