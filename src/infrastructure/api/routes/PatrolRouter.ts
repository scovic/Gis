import { Request, Response, Router } from "express";
import CreatePatrolController from "../../../controller/patrol/CreatePatrolController";
import GetPatrolAreasController from "../../../controller/patrol/GetPatrolAreasController";
import GetPatrolController from "../../../controller/patrol/GetPatrolController";
import GetPatrolStopsInsideAreaController from "../../../controller/patrol/GetPatrolStopsInsideAreaController";
import UpdatePatrolStatusController from "../../../controller/patrol/UpdatePatrolStatusController";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";

export default class PatrolRouter extends BaseRouter {
    private createPatrolController: CreatePatrolController;
    private updatePatrolStatusController: UpdatePatrolStatusController;
    private getPatrolController: GetPatrolController;
    private getPatrolAreasController: GetPatrolAreasController;
    private getPatrolStopsInsideAreaController: GetPatrolStopsInsideAreaController;

    constructor (dependency: Dependency) {
        super(dependency);
        this.createPatrolController = dependency.getCreatePatrolController();
        this.updatePatrolStatusController = dependency.getUpdatePatrolStatusController();
        this.getPatrolController = dependency.getGetPatrolController();
        this.getPatrolAreasController = dependency.getGetPatrolAreasController();
        this.getPatrolStopsInsideAreaController = dependency.getGetPatrolStopsInsideAreaController();
    }

    private getPatrol (req: Request, res: Response) {
        this.getPatrolController.getPatrol({
            id: req.params.id
        }, res);
    }

    private createPatrol (req: Request, res: Response) {
        this.createPatrolController.createPatrol({
            patrolStopIds: req.body.patrolStops,
            teamMembersIds: req.body.teamMembers,
            from: req.body.from,
            to: req.body.to
        }, res);
    }

    private updatePatrolStatus (req: Request, res: Response) {
        this.updatePatrolStatusController.updatePatrolStatus({
            patrolId: req.body.patrolId,
            status: req.body.status
        }, res);
    }

    private getPatrolAreas (req: Request, res: Response) {
        this.getPatrolAreasController.getPatrolAreas(res);
    }

    private getPatrolStopsInsideArea (req: Request, res: Response) {
        this.getPatrolStopsInsideAreaController.getPatrolStopsInsideArea({
            areaId: req.params.areaId
        }, res);
    }

    public getRouter (): Router {
        return Router()
            .get("/:id", (req, res) => this.getPatrol(req, res))
            .get("/areas", (req, res) => this.getPatrolAreas(req, res))
            .get("/areas/:areaId/stops", (req, res) => this.getPatrolStopsInsideArea(req, res))
            .post("/", (req, res) => this.createPatrol(req, res))
            .put("/:id/status", (req, res) => this.updatePatrolStatus(req, res));
    }
}
