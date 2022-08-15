import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolPatrolStopMapDataSource, PatrolPatrolStopMapData } from "./IPatrolPatrolStopMapDataSource";

export class PatrolPatrolStopMapDataSourceError extends Error {
    constructor (message: string) {
        super(`[PatrolPatrolStopMapDataSource] Error - ${message}`);
    }
}

export default class PatrolPatrolStopMapDataSource extends DatabaseDataSource implements IPatrolPatrolStopMapDataSource {
    private readonly _tableName = "patrol_patrol_stop_map"

    public async getPatrolStops (patrolId: string): Promise<PatrolPatrolStopMapData[]> {
        try {
            const rows = await this.knex(this._tableName)
                .select("*")
                .where({ patrol_id: patrolId });

            return this._convertDbRowsToData(rows);
        } catch (err: any) {
            throw new PatrolPatrolStopMapDataSourceError(err.message);
        }
    }

    public async  addPatrolStopsToPatrol (patrolId: string, patrolStopsIds: string[]): Promise<PatrolPatrolStopMapData[]> {
        try {
            const patrolPatrolStopMap = patrolStopsIds.map(patrolStopId => ({
                patrol_id: patrolId,
                patrol_stop_id: patrolStopId
            }));

            const insertedRows = await this.knex(this._tableName)
                .insert(patrolPatrolStopMap)
                .returning("*");

            return this._convertDbRowsToData(insertedRows);
        } catch (err: any) {
            throw new PatrolPatrolStopMapDataSourceError(err.message);
        }
    }
    

    private _convertDbRowsToData (rows: any): PatrolPatrolStopMapData[] {
        return rows.map((row: any)=> ({
            id: row.id,
            patrolId: row.patrol_id,
            patrolStopId: row.patrol_stop_id
        }));
    }
}
