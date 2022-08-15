import Patrol from "../domain/entity/Patrol";
import EmployeePresentation from "./EmployeePresentation";
import PatrolAreaPresentation from "./PatrolAreaPresentation";
import PatrolStopPresentation from "./PatrolStopPresentation";

export type PatrolPresentationData = {
    id: string,
    stops?: PatrolStopPresentation[],
    area?: PatrolAreaPresentation,
    team: EmployeePresentation[],
    period: {
        from: number,
        to: number
    },
    status: string
}

export default class PatrolPresentation {
    public static present (patrol: Patrol): PatrolPresentationData {
        const patrolPresentation: PatrolPresentationData = {
            id: patrol.id.getId(),
            team: patrol.team.getValue().map(employee => (
                EmployeePresentation.present(employee)
            )),
            period: {
                from: patrol.period.getValue().from,
                to: patrol.period.getValue().to
            },
            status: patrol.status
        };

        if (!patrol.stops.isEmpty()) {
            patrolPresentation.stops = patrol.stops.getValue().map(stop => (
                PatrolStopPresentation.present(stop)
            ));
        } else {
            patrolPresentation.area = PatrolAreaPresentation.present(patrol.area);
        }

        return patrolPresentation;
    }
}
