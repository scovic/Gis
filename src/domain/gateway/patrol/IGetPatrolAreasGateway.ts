import PatrolArea from "../../entity/PatrolArea";


export interface IGetPatrolAreasGateway {
    getPatrolAreas (): Promise<PatrolArea[]>
}
