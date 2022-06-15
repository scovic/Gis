import { IEmployeeGateway } from "../domain/gateway/employee/IEmployeeGateway";
import { IIdGenerator } from "../domain/gateway/IIdGenerator";
import { ICreatePatrolGateway } from "../domain/gateway/patrol/ICreatePatrolGateway";
import { IGetPatrolGateway } from "../domain/gateway/patrol/IGetPatrolGateway";
import { IUpdatePatrolStatusGateway } from "../domain/gateway/patrol/IUpdatePatrolStatusGateway";
import UUID from "../domain/valueObject/UUID";


export default class RepositoryFactory {
    constructor (
        private readonly idGeneratorRepository: IIdGenerator<UUID>,
        private readonly employeeRepository: IEmployeeGateway,
        private readonly createPatrolRepository: ICreatePatrolGateway,
        private readonly updatePatrolStatusRepository: IUpdatePatrolStatusGateway,
        private readonly getPatrolRepository: IGetPatrolGateway
    ) { }

    public getIdGeneratorRepository (): IIdGenerator<UUID> {
        return this.idGeneratorRepository;
    }

    public getEmployeeRepository (): IEmployeeGateway {
        return this.employeeRepository;
    }

    public getCreatePatrolRepository (): ICreatePatrolGateway {
        return this.createPatrolRepository;
    }

    public getUpdatePatrolStatusRepository (): IUpdatePatrolStatusGateway {
        return this.updatePatrolStatusRepository;
    }

    public getGetPatrolRepository (): IGetPatrolGateway {
        return this.getPatrolRepository;
    }
}
