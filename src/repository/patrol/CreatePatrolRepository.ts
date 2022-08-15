import { DatabaseEmployeeInput, IEmployeeDataSource } from "../../datasource/employee/IEmployeeDataSource";
import { IPatrolDataSource } from "../../datasource/patrol/IPatrolDataSource";
import { IPatrolEmployeeMapDataSource } from "../../datasource/patrolEmployeeMapDataSource/IPatrolEmployeeMapDataSource";
import { IPatrolPatrolStopMapDataSource } from "../../datasource/patrolPatrolStopMapDataSource/IPatrolPatrolStopMapDataSource";
import { IPatrolStopDataSource, PatrolStopData } from "../../datasource/patrolStop/IPatrolStopDataSource";
import Employee from "../../domain/entity/Employee";
import Patrol, { PatrolProps, PatrolStatus } from "../../domain/entity/Patrol";
import PatrolStop from "../../domain/entity/PatrolStop";
import { ICreatePatrolGateway, PatrolInputData } from "../../domain/gateway/patrol/ICreatePatrolGateway";
import EntityList from "../../domain/valueObject/EntityList";
import NonEmptyString from "../../domain/valueObject/NonEmptyString";
import Coords from "../../domain/valueObject/Coords";
import TimePeriod from "../../domain/valueObject/TimePeriod";
import UUID from "../../domain/valueObject/UUID";
import { IPatrolPatrolAreaMapDataSource } from "../../datasource/patrolPatrolAreaMapDataSource/IPatrolPatrolAreaMapDataSource";
import PatrolArea from "../../domain/entity/PatrolArea";
import { IPatrolAreaDataSource } from "../../datasource/patrolAreaDataSource/IPatrolAreaDataSource";
import Area from "../../domain/valueObject/Area";

export default class CreatePatrolRepository implements ICreatePatrolGateway {
    constructor (
        private patrolDataSource: IPatrolDataSource,
        private patrolStopDataSource: IPatrolStopDataSource,
        private patrolEmployeeMapDataSource: IPatrolEmployeeMapDataSource,
        private employeeDataSource: IEmployeeDataSource,
        private patrolPatrolStopMapDataSource: IPatrolPatrolStopMapDataSource,
        private patrolAreaDataSource: IPatrolAreaDataSource,
        private patrolPatrolAreaMapDataSource: IPatrolPatrolAreaMapDataSource,
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

        const promiseArray = [];
        promiseArray.push(addMembersPromise);

        if (patrol.stopIds) {
            const addPatrolStopsPromise = this.patrolPatrolStopMapDataSource.addPatrolStopsToPatrol(
                id.getId(),
                patrol.stopIds.map(stopId => stopId.getId())
            );
            promiseArray.push(addPatrolStopsPromise);
        }

        if (patrol.areaId) {
            const addPatrolAreaPromise = this.patrolPatrolAreaMapDataSource.addPatrolAreaToPatrol(
                id.getId(),
                patrol.areaId.getId()
            );
            promiseArray.push(addPatrolAreaPromise);
        }

        await Promise.all(promiseArray);

        const patrolTeam = await this._getPatrolTeam(patrol.memberIds);
        const status: PatrolStatus = (<any>PatrolStatus)[patrolRow.status];

        const patrolProps: PatrolProps = {
            team: patrolTeam,
            period: TimePeriod.create({ from: patrolRow.start, to: patrolRow.end }),
            status: status
        };

        if (patrol.stopIds) {
            patrolProps.stops = await this._getPatrolStops(patrol.stopIds);
        }

        if (patrol.areaId) {
            patrolProps.area = await this._getPatrolArea(patrol.areaId);
        }

        return new Patrol(id, patrolProps);
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

    private async _getPatrolArea (patrolAreaId: UUID): Promise<PatrolArea> {
        const patrolArea = await this.patrolAreaDataSource.getAreaById(patrolAreaId.getId());
        return new PatrolArea(
            patrolAreaId,
            {
                area: Area.create({ 
                    coords: patrolArea.areaCoords.map(coord => Coords.create(coord))
                }),
                name: patrolArea.name
            }
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
