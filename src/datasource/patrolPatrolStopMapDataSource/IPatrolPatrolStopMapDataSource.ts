
export type PatrolPatrolStopMapData = {
    id: string
    patrolId: string
    patrolStopId: string
}

export interface IPatrolPatrolStopMapDataSource {
    getPatrolStops (patrolId: string): Promise<PatrolPatrolStopMapData[]>
    addPatrolStopsToPatrol (patrolId: string, patrolStopsIds: string[]): Promise<PatrolPatrolStopMapData[]>
}
