import ValueObject from "./ValueObject";

export class PositionError extends Error {
    constructor (message: string) {
        super(`[Position] Error - ${message}`);
    }
}

export type PositionProps = {
    lon: number
    lat: number
}

export default class Position extends ValueObject<PositionProps> {
    public static create (props: PositionProps): Position {
        if (!this.iValid(props.lat, props.lon)) {
            throw new PositionError("Lat or Lon value is not valid");
        }

        return new Position(props);
    }

    private static iValid (lat: number, lon: number) {
        return lon >= 0 && Math.abs(lon) <= 180 &&
            lat >= 0 && Math.abs(lat) <= 90;
    }
    
    public isEqual (object?: ValueObject<PositionProps>): boolean {
        if (!object) { return false; }

        return this.getValue().lat === object.getValue().lat &&
            this.getValue().lon === object.getValue().lon;
    }

    public get lon (): number { return this.getValue().lon; }

    public get lat (): number { return this.getValue().lat; }
}
