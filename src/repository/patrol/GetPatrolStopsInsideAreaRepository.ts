import { IPatrolStopDataSource, PatrolStopData } from "../../datasource/patrolStop/IPatrolStopDataSource";
import PatrolStop from "../../domain/entity/PatrolStop";
import { IGetPatrolStopsInsideAreaGateway } from "../../domain/gateway/patrol/IGetPatrolStopsInsideAreaGateway";
import Location from "../../domain/valueObject/Location";
import UUID from "../../domain/valueObject/UUID";

export default class GetPatrolStopsInsideAreaRepository implements IGetPatrolStopsInsideAreaGateway {
    constructor (
        private patrolStopsDataSoruce: IPatrolStopDataSource
    ) {}

    public async getPatrolStopsInsideArea (areaId: UUID): Promise<PatrolStop[]> {
        const patrolStopsData = await this.patrolStopsDataSoruce.getPatrolStopsInArea(areaId.getId());
        return patrolStopsData.map(patrolStop => this._mapFromDataSourceToEntity(patrolStop));
    }

    private _mapFromDataSourceToEntity (patrolStop: PatrolStopData): PatrolStop {
        return new PatrolStop(
            UUID.create(patrolStop.id),
            {
                name: patrolStop.name,
                location: Location.create({
                    lat: Number(patrolStop.location.lat),
                    lon: Number(patrolStop.location.lon)
                })
            }
        );
    }
}
