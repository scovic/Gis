
export type PatrolEmployeeMapData = {
    id: string
    patrolId: string
    employeeId: string
}

export interface IPatrolEmployeeMapDataSource {
    addMembersToPatrol (patrolId: string, memeberIds: string[]): Promise<PatrolEmployeeMapData[]>
}
