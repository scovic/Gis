import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolPatrolAreaMapDataSource, PatrolPatrolStopMapData } from "./IPatrolPatrolAreaMapDataSource";

export class PatrolPatrolAreaMapDataSourceError extends Error {
    constructor (message: string) {
        super(`[PatrolPatrolAreaMapDataSource] Error - ${message}`);
    }
}

export default class PatrolPatrolAreaMapDataSource extends DatabaseDataSource implements IPatrolPatrolAreaMapDataSource {
    private readonly _tableName = "patrol_patrol_area_map"

    public async getPatrolArea (patrolId: string): Promise<PatrolPatrolStopMapData> {
        try {
            const row = await this.knex(this._tableName)
                .select("*")
                .where({ patrol_id: patrolId })
                .first();

            return row && this._dbRowToData(row);
        } catch (err: any) {
            throw new PatrolPatrolAreaMapDataSourceError(err.message);
        }
    }

    private _dbRowToData (row: any): PatrolPatrolStopMapData {
        return {
            id: row.id,
            patrolAreaId: row.patrol_area_id,
            patrolId: row.patrol_id
        };
    }
    
}
