import express, { Application } from "express";
import { ServerConfig } from "../../config/Config";
import Dependency from "../../dependency";


export class HttpServerError extends Error {
    constructor (message: string) {
        super(`[HttpServer] Error - ${message}`);
    }
}

export default abstract class BaseHttpServer {
    private _isRunning = false

    public constructor (protected _dependency: Dependency) { }

    public start ({ webRoot, port }: ServerConfig): void {
        this.checkIfStarted();
        this.bindRoutes(express())
            .listen(port, () => console.log(`HttpServer ${webRoot} is listening on port ${port}`));
    }

    private checkIfStarted () {
        if (this._isRunning) {
            throw new HttpServerError("Server is already running");
        }
        this._isRunning = true;
    }
    
    protected abstract bindRoutes (app: Application): Application
}
