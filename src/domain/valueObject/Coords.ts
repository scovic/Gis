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

export type CoordsInput = {
    lon: number | string
    lat: number | string
}

export default class Coords extends ValueObject<CoordProps> {
    public static create (props: CoordsInput): Coords {
        if (!this.isValid(Number(props.lat), Number(props.lon))) {
            throw new LocationError("Lat or Lon value is not valid");
        }

        return new Coords({ lat: Number(props.lat), lon: Number(props.lon) });
    }

    public static isValid (lat: number, lon: number): boolean {
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
