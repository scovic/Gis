import EmployeeList from "../valueObject/EmployeeList";
import UUID from "../valueObject/UUID";
import Employee from "./Employee";
import Entity from "./Entity";

export class TeamEntityError extends Error {
    constructor (message: string) {
        super(`[TeamEntity] Error - ${message}`);
    }
}

type TeamProps = {
    members: EmployeeList
}

class Team extends Entity<string, TeamProps> {
    constructor (id: UUID, props: TeamProps) {
        super(id, props);
    }

    public addMember (employee: Employee): void {
        if (!this.props.members.find(employee)) {
            this.props.members.addMember(employee);
        }
    }

    public get members (): EmployeeList { return this.props.members; }
}

export default Team;
