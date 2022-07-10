import Location from "../valueObject/Location";
import UUID from "../valueObject/UUID";
import Entity from "./Entity";

export class PatrolStopEntityError extends Error {
    constructor (message: string) {
        super (`[PatrolStopEntity] Error - ${message}`);
    }
}

type PatrolStopProps = {
    name: string
    location: Location
}

class PatrolStop extends Entity<string, PatrolStopProps> {
    constructor (id: UUID, props: PatrolStopProps) {
        super(id, props);
    }

    public get name (): string { return this.props.name; }

    public get location (): Location { return this.props.location; }
}

export default PatrolStop;
