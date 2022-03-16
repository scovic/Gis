
export class ConfigError extends Error {
    constructor (message: string) {
        super(`[Config] Error - ${message}`);
    }
}

export type DatabaseConfig = {
    host: string
    port: number
    user: string
    password: string
    dialect: string
    database: string
    useSSL: boolean
}

export type ServerConfig = {
    webRoot: string
    port: number
}

export type ConfigData = {
    db: DatabaseConfig
    server: ServerConfig
}

export default class Config {
    private _config: ConfigData 

    constructor (env: any) {
        this._config = this.parseEnv(env);
    }

    private parseEnv (env: any): ConfigData {
        try {
            return {
                db: {
                    host: Config.toString("DB_HOST", env.DB_HOST),
                    port: Config.toNumber("DB_PORT", env.DB_PORT),
                    user: Config.toString("DB_USERNAME", env.DB_USERNAME),
                    password: Config.toString("DB_PASSWORD", env.DB_PASSWORD),
                    dialect: Config.toString("DB_DIALECT", env.DB_DIALECT),
                    database: Config.toString("DB_NAME", env.DB_NAME),
                    useSSL: Config.toBoolean("DB_SSL", env.DB_SSL)
                },
                server: {
                    webRoot: Config.toString("WEB_ROOT", env.WEB_ROOT),
                    port: Config.toNumber("PORT", env.PORT)
                }
            };
        } catch (err) {
            throw new ConfigError(err.message);
        }
    }

    public getDbConfig (): DatabaseConfig {
        return this._config.db;
    }

    public getServerConfig (): ServerConfig {
        return this._config.server;
    }


    public static toNumber (tag: string, value: string): number {
        const result = parseInt(value);
        if (isNaN(result)) {
            throw new ConfigError(`[toNumber] - ${tag} is not a number, ${tag} - ${value}`);
        }
        return result;
    }

    public static toFloat (tag: string, value: string): number {
        const result = parseFloat(value);
        if (isNaN(result)) {
            throw new ConfigError(`[toFloat] - ${tag} is not a number, ${tag} - ${value}`);
        }
        return result;
    }

    public static toBoolean (tag: string, value: string | boolean): boolean {
        if (!value) {
            throw new ConfigError(`[toBoolean] - ${tag} is undefined, ${tag} - ${value}`);
        }

        if (typeof value === "boolean") {
            return value;
        }
        return value === "true";
    }

    public static toString (tag: string, value: any): string {
        if (!value) {
            throw new ConfigError(`[toString] - ${tag} string is undefined, ${tag} - ${value}`);
        }
        const result = new String(value).valueOf();
        if (result.length === 0) {
            throw new ConfigError(`[toString] - ${tag} string is empty, ${tag} - ${value}`);
        }
        return result;
    }
}
