import { IPatrolAreaDataSource, PatrolAreaData } from "../../datasource/patrolAreaDataSource/IPatrolAreaDataSource";
import PatrolArea from "../../domain/entity/PatrolArea";
import { IGetPatrolAreasGateway } from "../../domain/gateway/patrol/IGetPatrolAreasGateway";
import Area from "../../domain/valueObject/Area";
import Location from "../../domain/valueObject/Location";
import UUID from "../../domain/valueObject/UUID";

export default class GetPatrolAreasRepository implements IGetPatrolAreasGateway {
    constructor (
        private patrolAreaDataSource: IPatrolAreaDataSource
    ) {}


    public async getPatrolAreas (): Promise<PatrolArea[]> {
        const patrolAreaData = await this.patrolAreaDataSource.getAllPatrolAreas();
        return patrolAreaData.map(patrolArea => (
            this._mapFromDataSourceToEntity(patrolArea)
        ));
    }

    private _mapFromDataSourceToEntity (patrolAreaData: PatrolAreaData): PatrolArea {
        const coords = patrolAreaData.areaCoords.map(coords => 
            Location.create({ lat: Number(coords.lat), lon: Number(coords.lon) })
        );

        return new PatrolArea(
            UUID.create(patrolAreaData.id),
            {
                name: patrolAreaData.name,
                area: Area.create({ coords: coords })
            }
        );
    }

}
