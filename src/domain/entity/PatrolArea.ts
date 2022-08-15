import Area, { DummyArea } from "../valueObject/Area";
import UUID from "../valueObject/UUID";
import Entity from "./Entity";

type PatrolAreaProps = {
    name: string
    area: Area
}

class PatrolArea extends Entity<string, PatrolAreaProps> {
    constructor (id: UUID, props: PatrolAreaProps) {
        super(id, props);
    }

    public get name (): string { return this.props.name; }

    public get area (): Area { return this.props.area; }
}

export class DummyPatrolArea extends PatrolArea {
    constructor () {
        super(
            UUID.create("e146e31b-9b52-4499-9488-1dc3803be652"),
            {
                name: "DummyArea",
                area: new DummyArea()
            }
        );
    }
}

export default PatrolArea;
