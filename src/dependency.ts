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
import TeamDataSource from "./datasource/team/TeamDataSource";

import KnexWrapper from "./infrastructure/db/Knex";

import EmployeeRepository from "./repository/employee/EmployeeRepository";
import IdGeneratorRepository from "./repository/IdGeneratorRepository";
import CreatePatrolRepository from "./repository/patrol/CreatePatrolRepository";
import UpdatePatrolStatusRepository from "./repository/patrol/UpdatePatrolStatusRepository";
import RepositoryFactory from "./repository/RepositoryFactory";
import AddMemberToTeamRepository from "./repository/team/AddMemberToTeamRepository";
import CreateTeamRepository from "./repository/team/CreateTeamRepository";
import DeleteTeamRepository from "./repository/team/DeleteTeamRepository";
import ListTeamsRepository from "./repository/team/ListTeamsRepository";

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
        const patrolStopDataSource = new PatrolStopDataSource();
        const patrolDataSource = new PatrolDataSource();
        const teamDataSource = new TeamDataSource();

        return new RepositoryFactory(
            new IdGeneratorRepository(),
            new EmployeeRepository(employeeDataSource),
            new AddMemberToTeamRepository(employeeDataSource, teamDataSource),
            new CreateTeamRepository(employeeDataSource, teamDataSource),
            new DeleteTeamRepository(teamDataSource),
            new ListTeamsRepository(teamDataSource),
            new CreatePatrolRepository(patrolDataSource, teamDataSource, patrolStopDataSource),
            new UpdatePatrolStatusRepository(patrolDataSource)
        );
    }
}
