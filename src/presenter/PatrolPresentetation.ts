import Patrol from "../domain/entity/Patrol";
import EmployeePresentation from "./EmployeePresentation";
import PatrolStopPresentation from "./PatrolStopPresentation";

export type PatrolPresentationData = {
    id: string,
    stops: PatrolStopPresentation[],
    team: EmployeePresentation[],
    period: {
        from: number,
        to: number
    },
    status: string
}

export default class PatrolPresentation {
    public static present (patrol: Patrol): PatrolPresentationData {
        return {
            id: patrol.id.getId(),
            stops: patrol.stops.getValue().map(stop => (
                PatrolStopPresentation.present(stop)
            )),
            team: patrol.team.getValue().map(employee => (
                EmployeePresentation.present(employee)
            )),
            period: {
                from: patrol.period.getValue().from,
                to: patrol.period.getValue().to
            },
            status: patrol.status
        };
    }
}
