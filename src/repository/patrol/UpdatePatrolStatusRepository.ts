import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import Patrol from "../../domain/entity/Patrol";
import { IUpdatePatrolStatusGateway } from "../../domain/gateway/patrol/IUpdatePatrolStatusGateway";

export default class UpdatePatrolStatusRepository implements IUpdatePatrolStatusGateway {
    constructor (
        private patrolDataSource: IPatrolDataSource,
    ) {}

    public async updatePatrol (patrol: Patrol): Promise<Patrol> {
        await this.patrolDataSource.updatePatrol({
            id: patrol.id.getId(),
            status: patrol.status,
            start: `${patrol.period.getValue().from}`,
            end: `${patrol.period.getValue().to}`
        });

        return patrol;
    }
}
