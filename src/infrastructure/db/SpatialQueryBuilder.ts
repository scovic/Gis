/* eslint-disable prefer-rest-params */

export class InvalidQueryData extends Error {}

export type SelectOptions = {
    schema?: string,
    geoColumns?: string[]
    columns?: string[]
    includeNonGeoColumns?: boolean
}

export type WhereQuery = {
    [index: string]: any
}

// TODO: add insert
export default class SpatialQueryBuilder {
    private queryString: string | null = null

    public select (
        tableName: string,
        { schema = "public", geoColumns, columns, includeNonGeoColumns = true }: SelectOptions = {}
    ): SpatialQueryBuilder {
        let columnsSelectionPart = "*";

        if (geoColumns || columns) {
            const geoColumnPart = geoColumns ? geoColumns.map(item => `ST_AsGeoJson(${item}) as ${item}`).join(", ") : "";
            const nonGeoColumnPart = columns ? columns.join(", "): "*";

            columnsSelectionPart = includeNonGeoColumns && nonGeoColumnPart ? `${nonGeoColumnPart}, ${geoColumnPart}` : geoColumnPart;
        } 

        this.queryString = `select ${columnsSelectionPart} from ${schema}.${tableName}`;
        return this;
    }

    public whereIn (column: string, values: any[]): SpatialQueryBuilder {
        this._checkIfQueryStringIsInitialized();
        this.queryString = `${this.queryString} where ${column} in (${values.map(value => this._formatQueryData(value)).join(", ")})`;
        return this;
    }

    public orWhere (column: string, value: any): SpatialQueryBuilder {
        this._checkIfQueryStringIsInitialized();
        this.queryString = `${this.queryString} or ${this._whereExpression(column, value)}`;
        return this;
    }


    public where (args?: any | string, value?: any): SpatialQueryBuilder {
        this._checkIfQueryStringIsInitialized();

        let whereQueryPart = "";
        if (arguments.length === 1 && typeof arguments[0] === "object") {
            whereQueryPart = this._whereQueryWithObjectArgument(arguments[0]);
        } else {
            const [column, value] = Array.from(arguments);
            whereQueryPart = this._whereExpression(column, value);
        }

        this.queryString = `${this.queryString} where ${whereQueryPart}`;
        return this;
    }

    public insert (tableName: string, columns: string[] | null = null, schema = "public"): SpatialQueryBuilder {
        throw new Error("Not implemented");
    }

    public build (): string {
        this._checkIfQueryStringIsInitialized();
        return `${this.queryString};`;
    }
    
    private _whereQueryWithObjectArgument (whereQuery: WhereQuery): string {
        return Object.keys(whereQuery).map(key => this._whereExpression(key, whereQuery[key])).join(" and ");
    }

    private _whereExpression (column: string, value: any) {
        return `${column} = ${this._formatQueryData(value)}`;
    }

    private _formatQueryData (data: any) {
        if (typeof data === "undefined") {
            throw new InvalidQueryData("Query data cannot be undefined");
        }

        if (typeof data === "object") {
            throw new InvalidQueryData(`Query data cannot be object, ${data}`);
        }

        if (typeof data === "string") {
            return `'${data}'`;
        }

        return data;
    }

    private _checkIfQueryStringIsInitialized () {
        if (!this.queryString) {
            throw new Error("Must init query string with select or other command"); 
        }
    }
}
