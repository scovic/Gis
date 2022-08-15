import { Router, Request, Response } from "express";
import GetPatrolAreasController from "../../../controller/patrol/GetPatrolAreasController";
import GetPatrolStopsInsideAreaController from "../../../controller/patrol/GetPatrolStopsInsideAreaController";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";

export default class PatrolAreaRouter extends BaseRouter {
    private getPatrolAreasController: GetPatrolAreasController;
    private getPatrolStopsInsideAreaController: GetPatrolStopsInsideAreaController

    constructor (dependency: Dependency) {
        super(dependency);
        this.getPatrolAreasController = dependency.getGetPatrolAreasController();
        this.getPatrolStopsInsideAreaController = dependency.getGetPatrolStopsInsideAreaController();
    }

    private getPatrolAreas (req: Request, res: Response) {
        this.getPatrolAreasController.getPatrolAreas(res);
    }

    private getPatrolStopsInsideArea (req: Request, res: Response) {
        this.getPatrolStopsInsideAreaController.getPatrolStopsInsideArea({
            areaId: req.params.id
        }, res);
    }

    public getRouter (): Router {
        return Router()
            .get("/", (req, res) => this.getPatrolAreas(req, res))
            .get("/:id/stops", (req, res) => this.getPatrolStopsInsideArea(req, res));
    }
    
}
