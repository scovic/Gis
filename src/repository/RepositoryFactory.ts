import { IEmployeeGateway } from "../domain/gateway/employee/IEmployeeGateway";
import { IIdGenerator } from "../domain/gateway/IIdGenerator";
import { ICreatePatrolGateway } from "../domain/gateway/patrol/ICreatePatrolGateway";
import { IUpdatePatrolStatusGateway } from "../domain/gateway/patrol/IUpdatePatrolStatusGateway";
import { IAddMemberToTeamGateway } from "../domain/gateway/team/IAddMemberToTeamGateway";
import { ICreateTeamGateway } from "../domain/gateway/team/ICreateTeamGateway";
import { IDeleteTeamGateway } from "../domain/gateway/team/IDeleteTeamGateway";
import { IListTeamsGateway } from "../domain/gateway/team/IListTeamsGateway";
import UUID from "../domain/valueObject/UUID";


export default class RepositoryFactory {
    constructor (
        private readonly idGeneratorRepository: IIdGenerator<UUID>,
        private readonly employeeRepository: IEmployeeGateway,
        
        private readonly addMemberToTeamRepository: IAddMemberToTeamGateway,
        private readonly createTeamRepository: ICreateTeamGateway,
        private readonly deleteTeamRepository: IDeleteTeamGateway,
        private readonly listTeamsRepository: IListTeamsGateway,

        private readonly createPatrolRepository: ICreatePatrolGateway,
        private readonly updatePatrolStatusRepository: IUpdatePatrolStatusGateway
    ) { }

    public getIdGeneratorRepository (): IIdGenerator<UUID> {
        return this.idGeneratorRepository;
    }

    public getEmployeeRepository (): IEmployeeGateway {
        return this.employeeRepository;
    }

    public getAddMemberToTeamRepository (): IAddMemberToTeamGateway {
        return this.addMemberToTeamRepository;
    }

    public getCreateTeamRepository (): ICreateTeamGateway {
        return this.createTeamRepository;
    }

    public getDeleteTeamRepository (): IDeleteTeamGateway {
        return this.deleteTeamRepository;
    }

    public getListTeamsRepository (): IListTeamsGateway {
        return this.listTeamsRepository;
    }

    public getCreatePatrolRepository (): ICreatePatrolGateway {
        return this.createPatrolRepository;
    }

    public getUpdatePatrolStatusRepository (): IUpdatePatrolStatusGateway {
        return this.updatePatrolStatusRepository;
    }
}
