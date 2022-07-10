import Area from "../valueObject/Area";
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

export default PatrolArea;
