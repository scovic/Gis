
export type PatrolData = {
    id: string
    start: string
    end: string
    status: string
}

export interface IPatrolDataSource {
    createPatrol (patrolInput: PatrolData): Promise<PatrolData>
    updatePatrol (patrol: PatrolData): Promise<PatrolData>
    getPatrol (id: string): Promise<PatrolData>
}
