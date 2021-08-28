import Team from "../../entity/Team";
import EmployeeList from "../../valueObject/EmployeeList";

export interface ICreateTeamGateway {
    createTeam (id: string, employees: EmployeeList): Promise<Team>
}
