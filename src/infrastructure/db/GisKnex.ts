import { Knex } from "knex";
import KnexPostgis from "knex-postgis";

export default class GisKnexWrapper {
    private readonly _gisKnex: KnexPostgis.KnexPostgis

    constructor (knex: Knex) {
        this._gisKnex = KnexPostgis(knex);
    }

    public getKnexPostigs (): KnexPostgis.KnexPostgis {
        return this._gisKnex;
    }
}
