import { Request, Response, Router } from "express";
import GetPatrolStopsController from "../../../controller/patrol/GetPatrolStopsController";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";


export default class PatrolStopRouter extends BaseRouter {
    private getPatrolStopsController: GetPatrolStopsController

    constructor (dependency: Dependency) {
        super(dependency);
        this.getPatrolStopsController = dependency.getGetPatrolStopsController();
    }
    private getPatrolStops (req: Request, res: Response) {
        this.getPatrolStopsController.getPatrolStopsForPatrol(res);
    }
    
    public getRouter (): Router {
        return Router()
            .get("/", (req, res) => this.getPatrolStops(req, res));
    }
}
