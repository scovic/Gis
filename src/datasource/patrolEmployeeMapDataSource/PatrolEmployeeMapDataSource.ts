import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolEmployeeMapDataSource, PatrolEmployeeMapData } from "./IPatrolEmployeeMapDataSource";

export class PatrolEmployeeMapDataSourceError extends Error {
    constructor (message: string) {
        super(`[PatrolEmployeeMapDataSource] Error - ${message}`);
    }
}

export default class PatrolEmployeeMapDataSource extends DatabaseDataSource implements IPatrolEmployeeMapDataSource {
    private readonly _tableName = "patrol_employee_map"
    
    public async addMembersToPatrol (patrolId: string, memeberIds: string[]): Promise<PatrolEmployeeMapData[]> {
        try {
            const patrolEmployeeMapRows = await this.knex(this._tableName)
                .insert(this._prepareInsertData(patrolId, memeberIds))
                .returning("*");

            return patrolEmployeeMapRows.map(
                row => this._convertToPatrolEmployeeData(row)
            );
        } catch (err: any) {
            throw new PatrolEmployeeMapDataSourceError(err.message);
        }
    }

    public async getPatrolMembers (patrolId: string): Promise<PatrolEmployeeMapData[]> {
        try {
            const patrolEmployeeMapRows = await this.knex(this._tableName)
                .select("*")
                .where({ patrol_id: patrolId });
            return patrolEmployeeMapRows.map(row => this._convertToPatrolEmployeeData(row));
        } catch (err: any) {
            throw new PatrolEmployeeMapDataSourceError(err.message);
        }
    }

    private _prepareInsertData (patrolId: string, memberIds: string[]) {
        return memberIds.map(memberId => ({ patrol_id: patrolId, employee_id: memberId }));
    }

    private _convertToPatrolEmployeeData (row: any): PatrolEmployeeMapData {
        return {
            id: row.id,
            employeeId: row.employee_id,
            patrolId: row.patrol_id
        };
    }
    
}
