
export type PatrolPatrolStopMapData = {
    id: string
    patrolId: string
    patrolAreaId: string
}

export interface IPatrolPatrolAreaMapDataSource {
    getPatrolArea (patrolId: string): Promise<PatrolPatrolStopMapData[]>
}
