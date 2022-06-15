
export type PatrolStopDbRow = {
    id: string
    name: string
    position: {
        lat: string,
        lon: string
    }
}

export interface IPatrolStopDataSource {
    getStopsByIds (ids: string[]): Promise<PatrolStopDbRow[]>
}
