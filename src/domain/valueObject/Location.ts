import ValueObject from "./ValueObject";

export class LocationError extends Error {
    constructor (message: string) {
        super(`[Location] Error - ${message}`);
    }
}

export type LocationProps = {
    lon: number
    lat: number
}

export default class Location extends ValueObject<LocationProps> {
    public static create (props: LocationProps): Location {
        if (!this.isValid(props.lat, props.lon)) {
            throw new LocationError("Lat or Lon value is not valid");
        }

        return new Location(props);
    }

    public static isValid (lat: number, lon: number) {
        return lon >= 0 && Math.abs(lon) <= 180 &&
            lat >= 0 && Math.abs(lat) <= 90;
    }
    
    public isEqual (object?: ValueObject<LocationProps>): boolean {
        if (!object) { return false; }

        return this.getValue().lat === object.getValue().lat &&
            this.getValue().lon === object.getValue().lon;
    }

    public get lon (): number { return this.getValue().lon; }

    public get lat (): number { return this.getValue().lat; }
}
