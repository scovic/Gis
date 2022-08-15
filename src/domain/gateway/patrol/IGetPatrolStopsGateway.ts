import PatrolStop from "../../entity/PatrolStop";

export interface IGetPatrolStopsGateway {
    getPatrolStops (): Promise<PatrolStop[]>
}
