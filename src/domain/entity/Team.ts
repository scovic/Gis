import EntityList from "../valueObject/EntityList";
import UUID from "../valueObject/UUID";
import Employee from "./Employee";
import Entity from "./Entity";

export class TeamEntityError extends Error {
    constructor (message: string) {
        super(`[TeamEntity] Error - ${message}`);
    }
}

type TeamProps = {
    members: EntityList<Employee>
}

class Team extends Entity<string, TeamProps> {
    constructor (id: UUID, props: TeamProps) {
        if (props.members.getLength() < 2) {
            throw new TeamEntityError("Team has to contain at least two employees");
        }
        super(id, props);
    }

    public addMember (employee: Employee): void {
        if (!this.props.members.find(employee)) {
            this.props.members.addItem(employee);
        }
    }

    public get members (): EntityList<Employee> { return this.props.members; }
}

export default Team;
