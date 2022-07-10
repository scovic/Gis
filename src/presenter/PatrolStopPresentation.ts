import PatrolStop from "../domain/entity/PatrolStop";
import LocationPresentation from "./LocationPresentation";

export type PatrolStopPresentationData = {
    id: string
    name: string
    location: {
        lat: number,
        lon: number
    }
}

export default class PatrolStopPresentation {
    public static present (patrolStop: PatrolStop): PatrolStopPresentationData {
        return {
            id: patrolStop.id.getId(),
            name: patrolStop.name,
            location: LocationPresentation.present(patrolStop.location)
        };
    }
}
