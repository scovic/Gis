import Config from "./config/Config";

import EmployeeController from "./controller/employee/EmployeeController";
import CreatePatrolController from "./controller/patrol/CreatePatrolController";
import GetPatrolAreasController from "./controller/patrol/GetPatrolAreasController";
import GetPatrolController from "./controller/patrol/GetPatrolController";
import GetPatrolStopsInsideAreaController from "./controller/patrol/GetPatrolStopsInsideAreaController";
import UpdatePatrolStatusController from "./controller/patrol/UpdatePatrolStatusController";

import EmployeeDataSource from "./datasource/employee/EmployeeDataSource";
import PatrolDataSource from "./datasource/patrol/PatrolDataSource";
import PatrolAreaDataSource from "./datasource/patrolAreaDataSource/PatrolAreaDataSource";
import PatrolEmployeeMapDataSource from "./datasource/patrolEmployeeMapDataSource/PatrolEmployeeMapDataSource";
import PatrolPatrolAreaMapDataSource from "./datasource/patrolPatrolAreaMapDataSource/PatrolPatrolAreaMapDataSource";
import PatrolPatrolStopMapDataSource from "./datasource/patrolPatrolStopMapDataSource/PatrolPatrolStopMapDataSource";
import PatrolStopDataSource from "./datasource/patrolStop/PatrolStopDataSource";

import KnexWrapper from "./infrastructure/db/Knex";

import EmployeeRepository from "./repository/employee/EmployeeRepository";
import IdGeneratorRepository from "./repository/IdGeneratorRepository";
import CreatePatrolRepository from "./repository/patrol/CreatePatrolRepository";
import GetPatrolAreasRepository from "./repository/patrol/GetPatrolAreasRepository";
import GetPatrolRepository from "./repository/patrol/GetPatrolRepository";
import GetPatrolStopsInsideAreaRepository from "./repository/patrol/GetPatrolStopsInsideAreaRepository";
import UpdatePatrolStatusRepository from "./repository/patrol/UpdatePatrolStatusRepository";
import RepositoryFactory from "./repository/RepositoryFactory";

export default class Dependency {
    private static instance: Dependency | undefined = undefined
    private config: Config
    private knex: KnexWrapper
    private repositoryFactory: RepositoryFactory

    public static makeDependency (env: any): Dependency {
        if (!this.instance) {
            this.instance = new Dependency(env);
        }
        return this.instance;
    }

    private constructor (env: any) {
        this.config = new Config(env);
        this.knex = new KnexWrapper(this.config.getDbConfig());
        this.repositoryFactory = this.createRepositoryFactory();
    }

    public getEmployeeController (): EmployeeController {
        return new EmployeeController(this.repositoryFactory);
    }

    public getCreatePatrolController (): CreatePatrolController {
        return new CreatePatrolController(this.repositoryFactory);
    }

    public getUpdatePatrolStatusController (): UpdatePatrolStatusController {
        return new UpdatePatrolStatusController(this.repositoryFactory);
    }

    public getGetPatrolController (): GetPatrolController {
        return new GetPatrolController(this.repositoryFactory);
    }

    public getGetPatrolAreasController (): GetPatrolAreasController {
        return new GetPatrolAreasController(this.repositoryFactory);
    }

    public getGetPatrolStopsInsideAreaController (): GetPatrolStopsInsideAreaController {
        return new GetPatrolStopsInsideAreaController(this.repositoryFactory);
    }

    public getConfig (): Config {
        return this.config;
    }

    private createRepositoryFactory () {
        const employeeDataSource = new EmployeeDataSource(this.knex);
        const patrolStopDataSource = new PatrolStopDataSource(this.knex);
        const patrolDataSource = new PatrolDataSource(this.knex);
        const patrolEmployeeMap = new PatrolEmployeeMapDataSource(this.knex);
        const patrolPatrolStopMap = new PatrolPatrolStopMapDataSource(this.knex);
        const patrolPatrolAreaMap = new PatrolPatrolAreaMapDataSource(this.knex);
        const patrolAreaDataSource = new PatrolAreaDataSource(this.knex);

        return new RepositoryFactory(
            new IdGeneratorRepository(),
            new EmployeeRepository(employeeDataSource),
            new CreatePatrolRepository(
                patrolDataSource,
                patrolStopDataSource,
                patrolEmployeeMap,
                employeeDataSource,
                patrolPatrolStopMap
            ),
            new UpdatePatrolStatusRepository(patrolDataSource),
            new GetPatrolRepository(
                patrolDataSource,
                patrolStopDataSource,
                patrolEmployeeMap,
                patrolPatrolStopMap,
                patrolPatrolAreaMap,
                patrolAreaDataSource,
                employeeDataSource
            ),
            new GetPatrolAreasRepository(patrolAreaDataSource),
            new GetPatrolStopsInsideAreaRepository(patrolStopDataSource)
        );
    }
}
