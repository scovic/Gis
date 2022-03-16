import Employee from "../../entity/Employee";
import Team from "../../entity/Team";
import EntityList from "../../valueObject/EntityList";
import UUID from "../../valueObject/UUID";

export interface ICreateTeamGateway {
    getEmployeeList (ids: UUID[]): Promise<EntityList<Employee>>
    createTeam (id: UUID, employees: EntityList<Employee>): Promise<Team>
}
