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
            return this._convertDbRowsToData(patrolStopRows.rows);
            
        } catch (err: any) {
            throw new PatrolStopDataSourceError(err.message);
        }
    }

    public async getPatrolStopsInArea (areaId: string): Promise<PatrolStopData[]> {
        try {
            const query = `
                select patrol_stop.id as id, patrol_stop.name as name, ST_AsGeoJson(patrol_stop.location) as location 
                from patrol_stop, patrol_area
                where patrol_area.id = '${areaId}' and ST_Within(patrol_stop.location, patrol_area.area);
            `;

            const patrolStopRows = await this.knex.raw(query);
            return this._convertDbRowsToData(patrolStopRows.rows);
        } catch (err: any) {
            throw new PatrolStopDataSourceError(err.message);
        }
    }

    public async getPatrolStops (): Promise<PatrolStopData[]> {
        const query = new SpatialQueryBuilder()
            .select(this._tableName, { geoColumns: ["location"]})
            .build();
        
        const patrolStopRows = await this.knex.raw(query);
        return this._convertDbRowsToData(patrolStopRows.rows);
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
