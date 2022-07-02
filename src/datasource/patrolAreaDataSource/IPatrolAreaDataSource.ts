
export type PatrolAreaData = {
    id: string
    name: string
    areaCoords: {
        lat: string
        lon: string
    }[]
}


export interface IPatrolAreaDataSource {
    getAreaById (id: string): Promise<PatrolAreaData>
    getAreaByName (name: string): Promise<PatrolAreaData>
}
