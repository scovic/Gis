import SpatialQueryBuilder from "../../infrastructure/db/SpatialQueryBuilder";
import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolStopDataSource, PatrolStopData } from "./IPatrolStopDataSource";

export class PatrolStopDataSourceError extends Error {
    constructor (message: string) {
        super(`[PatrolStopDataSource] Error - ${message}`);
    }
}

// TODO: Fill when add spatial data
export default class PatrolStopDataSource extends DatabaseDataSource implements IPatrolStopDataSource {
    private readonly _tableName = "patrol_stop"

    public async getStopsByIds (ids: string[]): Promise<PatrolStopData[]> {
        try {
            const query = new SpatialQueryBuilder()
                .select(this._tableName, { geoColumns: ["location"]})
                .whereIn("id", ids)
                .build();

            const patrolStopRows = await this.knex.raw(query);
            return this._convertDbRowsToData(patrolStopRows);
            
        } catch (err: any) {
            throw new PatrolStopDataSourceError(err.message);
        }
    }

    private _convertDbRowsToData (rows: any[]): PatrolStopData[]  {
        return rows.map(row => {
            const [lon, lat] = JSON.parse(row.location).coordinates;
            return {
                id: row.id,
                name: row.name,
                location: {
                    lat,
                    lon
                }
            };
            
        });
    }
}
