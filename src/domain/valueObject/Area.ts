import Location from "./Location";
import ValueObject from "./ValueObject";

export class AreaError extends Error {
    constructor (message: string) {
        super(`[Area] Error - ${message}`);
    }
}

export type AreaProps = {
    coords: Location[]
}

export default class Area extends ValueObject<AreaProps> {
    
    public static create (props: AreaProps): Area {
        if (!this.isValid(props)) {
            throw new AreaError("Area props not valid");
        }
        
        return new Area(props);
    }

    private static isValid (props: AreaProps): boolean {
        if (!props || !props.coords || props.coords.length === 0) {
            return false;
        }

        return true;
    }

    public isEqual (object?: ValueObject<AreaProps> | undefined): boolean {
        if (!object) { return false; }

        if (this.coords.length !== object.getValue().coords.length) {
            return false;
        }

        for (let i = 0; i < this.coords.length; i++) {
            if (!this.coords[i].isEqual(object.getValue().coords[i])) {
                return false;
            }
        }

        return true;
    }

    public get coords (): Location[] { return this.getValue().coords; }
}
