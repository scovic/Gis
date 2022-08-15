import Coords from "../valueObject/Coords";
import UUID from "../valueObject/UUID";
import Entity from "./Entity";

export class PatrolStopEntityError extends Error {
    constructor (message: string) {
        super (`[PatrolStopEntity] Error - ${message}`);
    }
}

type PatrolStopProps = {
    name: string
    location: Coords
}

class PatrolStop extends Entity<string, PatrolStopProps> {
    constructor (id: UUID, props: PatrolStopProps) {
        super(id, props);
    }

    public get name (): string { return this.props.name; }

    public get location (): Coords { return this.props.location; }
}

export default PatrolStop;
