import { IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import { ITeamDataSource } from "../../datasource/team/ITeamDataSource";
import Employee from "../../domain/entity/Employee";
import Team from "../../domain/entity/Team";
import { ICreateTeamGateway } from "../../domain/gateway/team/ICreateTeamGateway";
import EntityList from "../../domain/valueObject/EntityList";
import UUID from "../../domain/valueObject/UUID";


export default class CreateTeamRepository implements ICreateTeamGateway {
    constructor (
        private employeeDataSource: IEmployeeDataSource,
        private teamDataSource: ITeamDataSource
    ) {}
    
    getEmployeeList (ids: UUID[]): Promise<EntityList<Employee>> {
        throw new Error("Method not implemented.");
    }

    createTeam (id: UUID, employees: EntityList<Employee>): Promise<Team> {
        throw new Error("Method not implemented.");
    }
    
}
