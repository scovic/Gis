import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import { IPatrolStopDataSource } from "../../datasource/patrolStop/IPatrolStopDataSource";
import { ITeamDataSource } from "../../datasource/team/ITeamDataSource";
import Patrol, { PatrolProps } from "../../domain/entity/Patrol";
import PatrolStop from "../../domain/entity/PatrolStop";
import Team from "../../domain/entity/Team";
import { ICreatePatrolGateway } from "../../domain/gateway/patrol/ICreatePatrolGateway";
import EntityList from "../../domain/valueObject/EntityList";
import UUID from "../../domain/valueObject/UUID";

export default class CreatePatrolRepository implements ICreatePatrolGateway {
    constructor (
        private patrolDataSource: IPatrolDataSource,
        private teamDataSource: ITeamDataSource,
        private patrolStopDataSource: IPatrolStopDataSource
    ) {}

    getPatrolStops (patrolStopIds: UUID[]): Promise<EntityList<PatrolStop>> {
        throw new Error("Method not implemented.");
    }

    getTeam (id: UUID): Promise<Team> {
        throw new Error("Method not implemented.");
    }

    createPatrol (id: UUID, patrol: PatrolProps): Promise<Patrol> {
        throw new Error("Method not implemented.");
    }
}
