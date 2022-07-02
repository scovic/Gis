import SpatialQueryBuilder from "../../infrastructure/db/SpatialQueryBuilder";
import DatabaseDataSource from "../DatabaseDataSource";
import { IPatrolAreaDataSource, PatrolAreaData } from "./IPatrolAreaDataSource";

export class PatrolAreaDataSourceEror extends Error {
    constructor (message: string) {
        super(`[PatrolAreaDataSource] Error - ${message}`);
    }
}


export default class PatrolAreaDataSource extends DatabaseDataSource implements IPatrolAreaDataSource {
    private readonly _tableName = "patrol_area"
    
    public async getAreaById (id: string): Promise<PatrolAreaData> {
        const query = new SpatialQueryBuilder()
            .select(this._tableName, { geoColumns: ["area"]})
            .where("id", id)
            .build();
        
        const row = await this.knex.raw(query);
        return this._dbRowToData(row);
    }

    public async getAreaByName (name: string): Promise<PatrolAreaData> {
        const query = new SpatialQueryBuilder()
            .select(this._tableName, { geoColumns: ["area"]})
            .where("name", name)
            .build();
        
        const row = await this.knex.raw(query);
        return this._dbRowToData(row);
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
