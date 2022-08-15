
export type PatrolStopData = {
    id: string
    name: string
    location: {
        lat: string
        lon: string
    }
}

export interface IPatrolStopDataSource {
    getStopsByIds (ids: string[]): Promise<PatrolStopData[]>
    getPatrolStopsInArea (areaId: string): Promise<PatrolStopData[]>
    getPatrolStops (): Promise<PatrolStopData[]>
}
