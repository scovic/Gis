import Location from "../domain/valueObject/Location";

export type LocationPresentationData = {
    lat: number
    lon: number
}

export default class LocationPresentation {
    public static present (location: Location): LocationPresentationData {
        return {
            lat: location.lat,
            lon: location.lon
        };
    }
}
