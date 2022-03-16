import { Knex, knex } from "knex";
import { DatabaseConfig } from "../../config/Config";

export default class KnexWrapper {
    private _knex: Knex

    constructor (config: DatabaseConfig) {
        this._knex = this.createKnex(config);
    }

    private createKnex (config: DatabaseConfig) {
        return knex({
            client: config.dialect,
            connection: {
                host: config.host,
                user: config.user,
                password: config.password,
                database: config.database,
                ssl: config.useSSL ? { servername: config.host } : undefined
            }
        });
    }

    public getKnex (): Knex { return this._knex; }
}   
