import Patrol from "../domain/entity/Patrol";
import PatrolStopPresentation from "./PatrolStopPresentation";
import TeamPresentation from "./TeamPresentation";

export type PatrolPresentationData = {
    stops: PatrolStopPresentation[],
    team: TeamPresentation,
    period: {
        from: number,
        to: number
    },
    status: string
}

export default class PatrolPresentation {
    public static present (patrol: Patrol): PatrolPresentationData {
        return {
            stops: patrol.stops.getValue().map(stop => (
                PatrolStopPresentation.present(stop)
            )),
            team: TeamPresentation.present(patrol.team),
            period: {
                from: patrol.period.getValue().from,
                to: patrol.period.getValue().to
            },
            status: patrol.status
        };
    }
}
