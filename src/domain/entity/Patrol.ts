import EntityList from "../valueObject/EntityList";
import TimePeriod from "../valueObject/TimePeriod";
import UUID from "../valueObject/UUID";
import Entity from "./Entity";
import PatrolStop from "./PatrolStop";
import Team from "./Team";

export class PatrolEntityError extends Error {
    constructor (message: string) {
        super(`[PatrolEntity] Error - ${message}`);
    }
}

export enum PatrolStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCESS",
    FAILED = "FAILED"
}

export type PatrolProps = {
    stops: EntityList<PatrolStop>
    team: Team
    period: TimePeriod,
    status: PatrolStatus
}

class Patrol extends Entity<string, PatrolProps> {
    constructor (id: UUID, props: PatrolProps) {
        if (props.stops.getLength() < 2) {
            throw new PatrolEntityError("There should be at least two stops to create patrol");
        }
        super (id, props);
    }

    public updateStatus (status: PatrolStatus): void {
        if (this.status === PatrolStatus.IN_PROGRESS && status === PatrolStatus.PENDING) {
            throw new PatrolEntityError(`Invalid status update, from ${this.status} to ${status}`);
        }

        if (this.isPatrolDone()) {
            throw new PatrolEntityError(`Invalid status update, from ${this.status} to ${status}`);
        }

        this.props.status = status;
    }

    public get stops (): EntityList<PatrolStop> {
        return this.props.stops;
    }

    public get team (): Team {
        return this.props.team;
    }

    public get status (): PatrolStatus {
        return this.props.status;
    }

    public get period (): TimePeriod {
        return this.props.period;
    }

    private isPatrolDone (): boolean {
        return this.status === PatrolStatus.FAILED || this.status === PatrolStatus.SUCCESS;
    }

}

export default Patrol;
