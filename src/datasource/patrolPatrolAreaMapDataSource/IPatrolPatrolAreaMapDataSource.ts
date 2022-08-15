
export type PatrolPatrolAreaMapData = {
    id: string
    patrolId: string
    patrolAreaId: string
}

export interface IPatrolPatrolAreaMapDataSource {
    getPatrolArea (patrolId: string): Promise<PatrolPatrolAreaMapData>
    addPatrolAreaToPatrol (patrolId: string, patrolAreaId: string): Promise<PatrolPatrolAreaMapData>
}
