import Config from "./config/Config";

import EmployeeController from "./controller/employee/EmployeeController";
import CreatePatrolController from "./controller/patrol/CreatePatrolController";
import UpdatePatrolStatusController from "./controller/patrol/UpdatePatrolStatusController";
import AddMemberToTeamController from "./controller/team/AddMemberToTeamController";
import CreateTeamController from "./controller/team/CreateTeamController";
import DeleteTeamController from "./controller/team/DeleteTeamController";
import ListTeamsController from "./controller/team/ListTeamsController";

import EmployeeDataSource from "./datasource/employee/EmployeeDataSource";
import PatrolDataSource from "./datasource/patrol/PatrolDataSource";
import PatrolStopDataSource from "./datasource/patrolStop/PatrolStopDataSource";
import GisKnexWrapper from "./infrastructure/db/GisKnex";

import KnexWrapper from "./infrastructure/db/Knex";

import EmployeeRepository from "./repository/employee/EmployeeRepository";
import IdGeneratorRepository from "./repository/IdGeneratorRepository";
import CreatePatrolRepository from "./repository/patrol/CreatePatrolRepository";
import UpdatePatrolStatusRepository from "./repository/patrol/UpdatePatrolStatusRepository";
import RepositoryFactory from "./repository/RepositoryFactory";

export default class Dependency {
    private static instance: Dependency | undefined = undefined
    private config: Config
    private knex: KnexWrapper
    private gisKnexWrapper: GisKnexWrapper
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
        this.gisKnexWrapper = new GisKnexWrapper(this.knex.getKnex());
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

    public getCreateTeamController (): CreateTeamController {
        return new CreateTeamController(this.repositoryFactory);
    }

    public getDeleteTeamController (): DeleteTeamController {
        return new DeleteTeamController(this.repositoryFactory);
    }

    public getAddMemberToTeamController (): AddMemberToTeamController {
        return new AddMemberToTeamController(this.repositoryFactory);
    }

    public getListTeamsController (): ListTeamsController {
        return new ListTeamsController(this.repositoryFactory);
    }

    public getConfig (): Config {
        return this.config;
    }

    private createRepositoryFactory () {
        const employeeDataSource = new EmployeeDataSource(this.knex);
        const patrolStopDataSource = new PatrolStopDataSource(this.knex);
        const patrolDataSource = new PatrolDataSource(this.knex);

        return new RepositoryFactory(
            new IdGeneratorRepository(),
            new EmployeeRepository(employeeDataSource),
            new CreatePatrolRepository(patrolDataSource, patrolStopDataSource),
            new UpdatePatrolStatusRepository(patrolDataSource)
        );
    }
}
