import { DatabaseEmployeeInput, IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import { IPatrolEmployeeMapDataSource } from "../../datasource/patrolEmployeeMapDataSource/IPatrolEmployeeMapDataSource";
import { IPatrolPatrolStopMapDataSource } from "../../datasource/patrolPatrolStopMapDataSource/IPatrolPatrolStopMapDataSource";
import { IPatrolStopDataSource, PatrolStopData } from "../../datasource/patrolStop/IPatrolStopDataSource";
import Employee from "../../domain/entity/Employee";
import Patrol, { PatrolStatus } from "../../domain/entity/Patrol";
import PatrolStop from "../../domain/entity/PatrolStop";
import { ICreatePatrolGateway, PatrolInputData } from "../../domain/gateway/patrol/ICreatePatrolGateway";
import EntityList from "../../domain/valueObject/EntityList";
import NonEmptyString from "../../domain/valueObject/NonEmptyString";
import Coords from "../../domain/valueObject/Coords";
import TimePeriod from "../../domain/valueObject/TimePeriod";
import UUID from "../../domain/valueObject/UUID";

export default class CreatePatrolRepository implements ICreatePatrolGateway {
    constructor (
        private patrolDataSource: IPatrolDataSource,
        private patrolStopDataSource: IPatrolStopDataSource,
        private patrolEmployeeMapDataSource: IPatrolEmployeeMapDataSource,
        private employeeDataSource: IEmployeeDataSource,
        private patrolPatrolStopMapDataSource: IPatrolPatrolStopMapDataSource
    ) {}

    public async createPatrol (id: UUID, patrol: PatrolInputData): Promise<Patrol> { 
        const patrolRow = await this.patrolDataSource.createPatrol({ 
            id: id.getValue(),
            status: patrol.status.toString() ,
            start: `${patrol.period.getValue().from}`,
            end: `${patrol.period.getValue().to}`,
        });
        
        const addMembersPromise = this.patrolEmployeeMapDataSource.addMembersToPatrol(
            id.getId(),
            patrol.memberIds.map(memberId => memberId.getId())
        );

        const addPatrolStopsPromise = this.patrolPatrolStopMapDataSource.addPatrolStopsToPatrol(
            id.getId(),
            patrol.stopIds.map(stopId => stopId.getId())
        );

        await Promise.all([addMembersPromise, addPatrolStopsPromise]);
      
        const getPatrolStopsPromise =  this._getPatrolStops(patrol.stopIds);
        const getPatrolTeamPromise = this._getPatrolTeam(patrol.memberIds);
        const [patrolStops, patrolTeam] = await Promise.all([getPatrolStopsPromise, getPatrolTeamPromise]);
        const status: PatrolStatus = (<any>PatrolStatus)[patrolRow.status];

        return new Patrol(id, {
            stops: patrolStops,
            team: patrolTeam,
            period: TimePeriod.create({ from: patrolRow.start, to: patrolRow.end }),
            status: status
        });
    }

    private async _getPatrolStops (patrolStopsIds: UUID[]): Promise<EntityList<PatrolStop>> {
        const patrolStopRows = await this.patrolStopDataSource.getStopsByIds(
            patrolStopsIds.map(patrolPatrolStopId => patrolPatrolStopId.getId())
        );

        return EntityList.create(
            patrolStopRows.map(patrolStopRow => this._createPatrolStopEntity(patrolStopRow))
        );
    }

    private async _getPatrolTeam (memberIds: UUID[]): Promise<EntityList<Employee>> {
        const members = await this.employeeDataSource.getEmployeesByIds(
            memberIds.map(memberId => memberId.getId())
        );
        
        return EntityList.create(
            members.map(member => this._createEmployeeEntity(member))
        );
    }

    // TODO: move to some factory
    private _createPatrolStopEntity (PatrolStopData: PatrolStopData): PatrolStop {
        return new PatrolStop(
            UUID.create(PatrolStopData.id),
            {
                name: PatrolStopData.name,
                location: Coords.create({ 
                    lat: Number(PatrolStopData.location.lat), 
                    lon: Number(PatrolStopData.location.lon) 
                })
            }
        );
    }

    private _createEmployeeEntity (employeeRow: DatabaseEmployeeInput): Employee {
        return new Employee(
            UUID.create(employeeRow.id),
            {
                firstName: NonEmptyString.create(employeeRow.firstName),
                lastName: NonEmptyString.create(employeeRow.lastName)
            }
        );
    }
}
