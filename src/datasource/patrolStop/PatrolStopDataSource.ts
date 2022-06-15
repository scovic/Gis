import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolStopDataSource, PatrolStopDbRow } from "./IPatrolStopDataSource";

export class PatrolStopDataSourceError extends Error {
    constructor (message: string) {
        super(`[PatrolStopDataSource] Error - ${message}`);
    }
}

// TODO: Fill when add spatial data
export default class PatrolStopDataSource extends DatabaseDataSource implements IPatrolStopDataSource {
    private readonly _tableName = "patrol_stop"

    public async getStopsByIds (ids: string[]): Promise<PatrolStopDbRow[]> {
        try {
            const patrolStopRows = await this.knex(this._tableName).whereIn("id", ids);
            return [];
            
        } catch (err: any) {
            throw new PatrolStopDataSourceError(err.message);
        }
    }
}
