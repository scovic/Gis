import PatrolStop from "../../entity/PatrolStop";
import UUID from "../../valueObject/UUID";

export interface IGetPatrolStopsInsideAreaGateway {
    getPatrolStopsInsideArea (areaId: UUID): Promise<PatrolStop[]>
}
