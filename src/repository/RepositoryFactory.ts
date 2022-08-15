import { IEmployeeGateway } from "../domain/gateway/employee/IEmployeeGateway";
import { IIdGenerator } from "../domain/gateway/IIdGenerator";
import { ICreatePatrolGateway } from "../domain/gateway/patrol/ICreatePatrolGateway";
import { IGetPatrolAreasGateway } from "../domain/gateway/patrol/IGetPatrolAreasGateway";
import { IGetPatrolGateway } from "../domain/gateway/patrol/IGetPatrolGateway";
import { IGetPatrolStopsGateway } from "../domain/gateway/patrol/IGetPatrolStopsGateway";
import { IGetPatrolStopsInsideAreaGateway } from "../domain/gateway/patrol/IGetPatrolStopsInsideAreaGateway";
import { IUpdatePatrolStatusGateway } from "../domain/gateway/patrol/IUpdatePatrolStatusGateway";
import UUID from "../domain/valueObject/UUID";

export default class RepositoryFactory {
    constructor (
        private readonly idGeneratorRepository: IIdGenerator<UUID>,
        private readonly employeeRepository: IEmployeeGateway,
        private readonly createPatrolRepository: ICreatePatrolGateway,
        private readonly updatePatrolStatusRepository: IUpdatePatrolStatusGateway,
        private readonly getPatrolRepository: IGetPatrolGateway,
        private readonly getPatrolAreasRepository: IGetPatrolAreasGateway,
        private readonly getPatrolStopsInsideAreaRepository: IGetPatrolStopsInsideAreaGateway,
        private readonly getPatrolStopsRepository: IGetPatrolStopsGateway
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

    public getGetPatrolAreaRepository (): IGetPatrolAreasGateway {
        return this.getPatrolAreasRepository;
    }

    public getGetPatrolStopsInsideAreaRepository (): IGetPatrolStopsInsideAreaGateway {
        return this.getPatrolStopsInsideAreaRepository;
    }

    public getGetPatrolStopsForPatrolRepository (): IGetPatrolStopsGateway {
        return this.getPatrolStopsRepository;
    }
}
