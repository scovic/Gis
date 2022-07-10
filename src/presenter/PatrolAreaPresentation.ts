import PatrolArea from "../domain/entity/PatrolArea";
import LocationPresentation from "./LocationPresentation";

export type PatrolAreaPresentationData = {
    id: string
    name: string
    area: { lat: number, lon: number }[]
}

export default class PatrolAreaPresentation {
    public static present (patrolArea: PatrolArea): PatrolAreaPresentationData {
        return {
            id: patrolArea.id.getId(),
            name: patrolArea.name,
            area: patrolArea.area.coords.map(
                coord => LocationPresentation.present(coord)
            )
        };
    }
}
