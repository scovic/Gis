import SpatialQueryBuilder from "../../infrastructure/db/SpatialQueryBuilder";
import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolAreaDataSource, PatrolAreaData } from "./IPatrolAreaDataSource";

export class PatrolAreaDataSourceError extends Error {
    constructor (message: string) {
        super(`[PatrolAreaDataSource] Error - ${message}`);
    }
}


export default class PatrolAreaDataSource extends DatabaseDataSource implements IPatrolAreaDataSource {
    private readonly _tableName = "patrol_area"
    
    public async getAreaById (id: string): Promise<PatrolAreaData> {
        try {
            const query = new SpatialQueryBuilder()
                .select(this._tableName, { geoColumns: ["area"]})
                .where("id", id)
                .build();
        
            const row = await this.knex.raw(query);
            return this._dbRowToData(row);
        } catch (err: any) {
            throw new PatrolAreaDataSourceError(err.message);
        }
    }

    public async getAreaByName (name: string): Promise<PatrolAreaData> {
        try {
            const query = new SpatialQueryBuilder()
                .select(this._tableName, { geoColumns: ["area"]})
                .where("name", name)
                .build();
        
            const row = await this.knex.raw(query);
            return this._dbRowToData(row);
        } catch (err: any) {
            throw new PatrolAreaDataSourceError(err.message);
        }
    }

    public async getAllPatrolAreas (): Promise<PatrolAreaData[]> {
        try {
            const query = new SpatialQueryBuilder()
                .select(this._tableName, { geoColumns: ["area"]})
                .build();

            const rows = await this.knex.raw(query);
            return rows.map((row: any) => this._dbRowToData(row));
        } catch (err: any) {
            throw new PatrolAreaDataSourceError(err.message);
        }
    }

    private _dbRowToData (row: any): PatrolAreaData {
        const coords = JSON.parse(row.area).coordinates[0];

        return {
            id: row.id,
            name: row.name,
            areaCoords: coords.map((coord: any) => {
                return {
                    lon: coord[0],
                    lat: coord[1]   
                };
            })
        };
    }
}
