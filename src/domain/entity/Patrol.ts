import { DummyArea } from "../valueObject/Area";
import EntityList from "../valueObject/EntityList";
import TimePeriod from "../valueObject/TimePeriod";
import UUID from "../valueObject/UUID";
import Employee from "./Employee";
import Entity from "./Entity";
import PatrolArea, { DummyPatrolArea } from "./PatrolArea";
import PatrolStop from "./PatrolStop";

export class PatrolEntityError extends Error {
    constructor (message: string) {
        super(`[PatrolEntity] Error - ${message}`);
    }
}

export enum PatrolStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export type PatrolProps = {
    stops?: EntityList<PatrolStop>
    area?: PatrolArea
    team: EntityList<Employee>
    period: TimePeriod,
    status: PatrolStatus
}

class PatrolPropsFactory {
    private patrolProps: any = {}

    public addTeam (team: EntityList<Employee>): PatrolPropsFactory {
        this.patrolProps.team = team;
        return this;
    }

    public addPeriod (period: TimePeriod): PatrolPropsFactory {
        this.patrolProps.period = period;
        return this;
    }

    public addStatus (status: PatrolStatus): PatrolPropsFactory {
        this.patrolProps.status = status;
        return this;
    }

    public addStops (patrolStops: EntityList<PatrolStop>): PatrolPropsFactory {
        if (this.patrolProps.area) {
            throw new PatrolEntityError("Can't have both patrol stops and area");
        }
        this.patrolProps.stops = patrolStops;
        return this;
    }

    public addArea (patrolArea: PatrolArea): PatrolPropsFactory {
        if (this.patrolProps.stops) {
            throw new PatrolEntityError("Can't have both patrol stops and area");
        }
        this.patrolProps.area = patrolArea;
        return this;
    }

    public build (): PatrolProps {
        return this.patrolProps;
    }
}

class Patrol extends Entity<string, PatrolProps> {
    constructor (id: UUID, props: PatrolProps) {
        if (props.stops && props.stops.getLength() < 2) {
            throw new PatrolEntityError("There should be at least two stops to create patrol");
        }

        if (!props.stops && !props.area) {
            throw new PatrolEntityError("There should list of patrol stops or patrol area");
        }

        if (props.stops && props.area) {
            throw new PatrolEntityError("Can't have both patrol stops and patrol area at the same time");
        }
        super (id, props);
    }

    public updateStatus (status: PatrolStatus): void {
        if (!this.isStatusSupported(status)) {
            throw new PatrolEntityError(`${status} is not supported status`);
        }

        if (this.status === PatrolStatus.IN_PROGRESS && status === PatrolStatus.PENDING) {
            throw new PatrolEntityError(`Invalid status update, from ${this.status} to ${status}`);
        }

        if (this.isPatrolDone()) {
            throw new PatrolEntityError(`Invalid status update, from ${this.status} to ${status}`);
        }

        this.props.status = status;
    }

    public get stops (): EntityList<PatrolStop> {
        return this.props.stops || EntityList.create([]);
    }

    public get team (): EntityList<Employee> {
        return this.props.team;
    }

    public get area (): PatrolArea {
        return this.props.area || new DummyPatrolArea();
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

    private isStatusSupported (status: string) {
        return Object.keys(PatrolStatus).includes(status);
    }

}

export default Patrol;
export {
    PatrolPropsFactory
};
