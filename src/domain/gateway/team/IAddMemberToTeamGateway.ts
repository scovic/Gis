import Employee from "../../entity/Employee";
import Team from "../../entity/Team";

export interface IAddMemberToTeamGateway {
    getEmployee (employeeId: string): Promise<Employee>
    getTeam (teamId: string): Promise<Team>
    updateTeam (team: Team): Promise<Team>
}
