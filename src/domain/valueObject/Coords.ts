import ValueObject from "./ValueObject";

export class LocationError extends Error {
    constructor (message: string) {
        super(`[Coords] Error - ${message}`);
    }
}

export type CoordProps = {
    lon: number
    lat: number
}

export default class Coords extends ValueObject<CoordProps> {
    public static create (props: CoordProps): Coords {
        if (!this.isValid(props.lat, props.lon)) {
            throw new LocationError("Lat or Lon value is not valid");
        }

        return new Coords(props);
    }

    public static isValid (lat: number, lon: number) {
        return lon >= 0 && Math.abs(lon) <= 180 &&
            lat >= 0 && Math.abs(lat) <= 90;
    }
    
    public isEqual (object?: ValueObject<CoordProps>): boolean {
        if (!object) { return false; }

        return this.getValue().lat === object.getValue().lat &&
            this.getValue().lon === object.getValue().lon;
    }

    public get lon (): number { return this.getValue().lon; }

    public get lat (): number { return this.getValue().lat; }
}
