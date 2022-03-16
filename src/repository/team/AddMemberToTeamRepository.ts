import { IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import { ITeamDataSource } from "../../datasource/team/ITeamDataSource";
import Employee from "../../domain/entity/Employee";
import Team from "../../domain/entity/Team";
import { IAddMemberToTeamGateway } from "../../domain/gateway/team/IAddMemberToTeamGateway";

export default class AddMemberToTeamRepository implements IAddMemberToTeamGateway {
    constructor (
        private employeeDataSource: IEmployeeDataSource,
        private teamDataSource: ITeamDataSource
    ) { }
    
    getEmployee (employeeId: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }

    getTeam (teamId: string): Promise<Team> {
        throw new Error("Method not implemented.");
    }

    updateTeam (team: Team): Promise<Team> {
        throw new Error("Method not implemented.");
    }
}
