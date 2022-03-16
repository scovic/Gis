import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import Patrol from "../../domain/entity/Patrol";
import { IUpdatePatrolStatusGateway } from "../../domain/gateway/patrol/IUpdatePatrolStatusGateway";
import UUID from "../../domain/valueObject/UUID";

export default class UpdatePatrolStatusRepository implements IUpdatePatrolStatusGateway {
    constructor (private patrolDataSource: IPatrolDataSource) {}
    
    getPatrol (id: UUID): Promise<Patrol> {
        throw new Error("Method not implemented.");
    }

    updatePatrol (patrol: Patrol): Promise<Patrol> {
        throw new Error("Method not implemented.");
    }
}
