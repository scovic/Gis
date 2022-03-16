import PatrolStop from "../domain/entity/PatrolStop";

export type PatrolStopPresentationData = {
    name: string
    position: {
        lat: number,
        lon: number
    }
}

export default class PatrolStopPresentation {
    public static present (patrolStop: PatrolStop): PatrolStopPresentationData {
        return {
            name: patrolStop.name,
            position: {
                lat: patrolStop.position.lat,
                lon: patrolStop.position.lon
            }
        };
    }
}
