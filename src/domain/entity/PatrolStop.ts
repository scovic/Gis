import Position from "../valueObject/Position";
import UUID from "../valueObject/UUID";
import Entity from "./Entity";

export class PatrolStopEntityError extends Error {
    constructor (message: string) {
        super (`[PatrolStopEntity] Error - ${message}`);
    }
}

type PatrolStopProps = {
    name: string
    position: Position
}

class PatrolStop extends Entity<string, PatrolStopProps> {
    constructor (id: UUID, props: PatrolStopProps) {
        super(id, props);
    }

    public get name (): string { return this.props.name; }

    public get position (): Position { return this.position; }
}

export default PatrolStop;
