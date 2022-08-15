import Coords from "../domain/valueObject/Coords";

export type LocationPresentationData = {
    lat: number
    lon: number
}

export default class LocationPresentation {
    public static present (location: Coords): LocationPresentationData {
        return {
            lat: location.lat,
            lon: location.lon
        };
    }
}
