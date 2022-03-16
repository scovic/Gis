import { Knex } from "knex";
import KnexWrapper from "../infrastructure/db/Knex";


export default class DatabaseDataSource {
    protected knex: Knex

    constructor (knex: KnexWrapper) {
        this.knex = knex.getKnex();
    }
}
