import { IPatrolStopDataSource, PatrolStopData } from "../../datasource/patrolStop/IPatrolStopDataSource";
import PatrolStop from "../../domain/entity/PatrolStop";
import { IGetPatrolStopsGateway } from "../../domain/gateway/patrol/IGetPatrolStopsGateway";
import Coords from "../../domain/valueObject/Coords";
import UUID from "../../domain/valueObject/UUID";

export default class GetPatrolStopsRepository implements IGetPatrolStopsGateway {
    constructor (
        private patrolStopDataSource: IPatrolStopDataSource
    ) {}
    
    public async getPatrolStops (): Promise<PatrolStop[]> {
        const patrolStops = await this.patrolStopDataSource.getPatrolStops();
        return patrolStops.map(patrolStop => this._createPatrolStopEntity(patrolStop));
    }
    

    private _createPatrolStopEntity (dbPatrolStop: PatrolStopData): PatrolStop {
        return new PatrolStop(
            UUID.create(dbPatrolStop.id),
            {
                name: dbPatrolStop.name,
                location: Coords.create({ 
                    lat: dbPatrolStop.location.lat,
                    lon: dbPatrolStop.location.lon
                })
            }
        );
    }
    
}
