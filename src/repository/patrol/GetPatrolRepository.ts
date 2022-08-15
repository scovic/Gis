import { DatabaseEmployeeData, IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import { IPatrolEmployeeMapDataSource } from "../../datasource/patrolEmployeeMapDataSource/IPatrolEmployeeMapDataSource";
import { IPatrolPatrolStopMapDataSource } from "../../datasource/patrolPatrolStopMapDataSource/IPatrolPatrolStopMapDataSource";
import { IPatrolStopDataSource, PatrolStopData } from "../../datasource/patrolStop/IPatrolStopDataSource";
import { IGetPatrolGateway } from "../../domain/gateway/patrol/IGetPatrolGateway";

import Patrol, { PatrolPropsFactory, PatrolStatus } from "../../domain/entity/Patrol";
import UUID from "../../domain/valueObject/UUID";
import EntityList from "../../domain/valueObject/EntityList";
import Employee from "../../domain/entity/Employee";
import NonEmptyString from "../../domain/valueObject/NonEmptyString";
import PatrolStop from "../../domain/entity/PatrolStop";
import TimePeriod from "../../domain/valueObject/TimePeriod";
import Coords from "../../domain/valueObject/Coords";
import { IPatrolPatrolAreaMapDataSource } from "../../datasource/patrolPatrolAreaMapDataSource/IPatrolPatrolAreaMapDataSource";
import PatrolArea from "../../domain/entity/PatrolArea";
import { IPatrolAreaDataSource } from "../../datasource/patrolAreaDataSource/IPatrolAreaDataSource";
import Area from "../../domain/valueObject/Area";

export class GetPatrolRepositoryError extends Error {
    constructor (message: string) {
        super(`[GetPatrolRepository] Error - ${message}`);
    }
}

// TODO: Create some factory method for patrolCreation
export default class GetPatrolRepository implements IGetPatrolGateway {
    constructor (
        private patrolDataSource: IPatrolDataSource,
        private patrolStopDataSource: IPatrolStopDataSource,
        private patrolEmployeeMapDataSource: IPatrolEmployeeMapDataSource,
        private patrolPatrolStopMapDataSource: IPatrolPatrolStopMapDataSource,
        private patrolPatrolAreaMapDataSource: IPatrolPatrolAreaMapDataSource,
        private patrolAreaDataSource: IPatrolAreaDataSource,
        private employeeDataSource: IEmployeeDataSource
    ) {}

    public async getPatrol (id: UUID): Promise<Patrol> {
        const patrolId: string = id.getId();

        const patrol = await this.patrolDataSource.getPatrol(patrolId);
        if (!patrol) {
            throw new GetPatrolRepositoryError("Not found");
        }

        const employeePatrolMap = await this.patrolEmployeeMapDataSource.getPatrolMembers(patrolId);
        const patrolPatrolStopMap = await this.patrolPatrolStopMapDataSource.getPatrolStops(patrolId);
        const patrolPatrolAreaMap = await this.patrolPatrolAreaMapDataSource.getPatrolArea(patrolId);

        const patrolMembers = await this.employeeDataSource.getEmployeesByIds(
            employeePatrolMap.map(employeePatrol => employeePatrol.employeeId)
        );

        const timePeriod = TimePeriod.create({
            from: patrol.start,
            to: patrol.end
        });

        const patrolPropsFactory = new PatrolPropsFactory()
            .addTeam(EntityList.create(this._createEmployeeList(patrolMembers)))
            .addPeriod(timePeriod)
            .addStatus(<PatrolStatus>patrol.status);


        if (patrolPatrolStopMap.length === 0) {
            const patrolArea = await this.patrolAreaDataSource.getAreaById(patrolPatrolAreaMap.patrolAreaId);
            patrolPropsFactory.addArea(this._createPatrolArea({
                id: patrolArea.id,
                name: patrolArea.name,
                coords: patrolArea.areaCoords.map(areaCoord => Coords.create(
                    { lat: Number(areaCoord.lat), lon: Number(areaCoord.lon)})
                )
            }));

        } else {
            const patrolStops = await this.patrolStopDataSource.getStopsByIds(
                patrolPatrolStopMap.map(patrolPatrolStop => patrolPatrolStop.patrolStopId)
            );

            patrolPropsFactory.addStops(EntityList.create(this._createPatrolStopList(patrolStops)));
        }

        

        return new Patrol(
            UUID.create(patrol.id),
            patrolPropsFactory.build()
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
                    location: new Coords({
                        lat: Number(patrolStop.location.lat),
                        lon: Number(patrolStop.location.lon)
                    })
                }
            )
        ));
    }

    private _createPatrolArea (patrolAreaProps: { id: string, name: string, coords: Coords[] }): PatrolArea {
        return new PatrolArea(
            UUID.create(patrolAreaProps.id),
            {
                name: patrolAreaProps.name,
                area: Area.create({ coords: patrolAreaProps.coords })
            }
        );
    }
}
