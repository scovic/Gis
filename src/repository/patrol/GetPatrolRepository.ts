import { DatabaseEmployeeData, IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import { IPatrolEmployeeMapDataSource } from "../../datasource/patrolEmployeeMapDataSource/IPatrolEmployeeMapDataSource";
import { IPatrolPatrolStopMapDataSource } from "../../datasource/patrolPatrolStopMapDataSource/IPatrolPatrolStopMapDataSource";
import { IPatrolStopDataSource, PatrolStopData } from "../../datasource/patrolStop/IPatrolStopDataSource";
import { IGetPatrolGateway } from "../../domain/gateway/patrol/IGetPatrolGateway";

import Patrol, { PatrolStatus } from "../../domain/entity/Patrol";
import UUID from "../../domain/valueObject/UUID";
import EntityList from "../../domain/valueObject/EntityList";
import Employee from "../../domain/entity/Employee";
import NonEmptyString from "../../domain/valueObject/NonEmptyString";
import PatrolStop from "../../domain/entity/PatrolStop";
import TimePeriod from "../../domain/valueObject/TimePeriod";
import Location from "../../domain/valueObject/Location";


// TODO: Create some factory method for patrolCreation
export default class GetPatrolRepository implements IGetPatrolGateway {
    constructor (
        private patrolDataSource: IPatrolDataSource,
        private patrolStopDataSource: IPatrolStopDataSource,
        private patrolEmployeeMapDataSource: IPatrolEmployeeMapDataSource,
        private patrolPatrolStopMapDataSource: IPatrolPatrolStopMapDataSource,
        private employeeDataSource: IEmployeeDataSource
    ) {}

    public async getPatrol (id: UUID): Promise<Patrol> {
        const patrol = await this.patrolDataSource.getPatrol(id.getId());
        const employeePatrolMap = await this.patrolEmployeeMapDataSource.getPatrolMembers(id.getId());
        const patrolPatrolStopMap = await this.patrolPatrolStopMapDataSource.getPatrolStops(id.getId());

        const patrolMembers = await this.employeeDataSource.getEmployeesByIds(
            employeePatrolMap.map(employeePatrol => employeePatrol.employeeId)
        );

        const patrolStops = await this.patrolStopDataSource.getStopsByIds(
            patrolPatrolStopMap.map(patrolPatrolStop => patrolPatrolStop.id )
        );

        return new Patrol(
            UUID.create(patrol.id),
            {
                team: EntityList.create(this._createEmployeeList(patrolMembers)),
                stops: EntityList.create(this._createPatrolStopList(patrolStops)),
                status: <PatrolStatus>patrol.status,
                period: TimePeriod.create({
                    from: patrol.start,
                    to: patrol.end
                })
            }
        );
    }

    private _createEmployeeList (employeesDbData: DatabaseEmployeeData[]): Employee[] {
        return employeesDbData.map(employeeDb => (
            new Employee(
                UUID.create(employeeDb.id),
                { 
                    firstName: NonEmptyString.create(employeeDb.firstName),
                    lastName: NonEmptyString.create(employeeDb.lastName)
                }
            )
        ));
    }

    private _createPatrolStopList (patrolStopDbData: PatrolStopData[]): PatrolStop[] {
        return patrolStopDbData.map(patrolStop => (
            new PatrolStop(
                UUID.create(patrolStop.id), 
                {
                    name: patrolStop.name,
                    location: new Location({
                        lat: Number(patrolStop.location.lat),
                        lon: Number(patrolStop.location.lon)
                    })
                }
            )
        ));
    }
}
