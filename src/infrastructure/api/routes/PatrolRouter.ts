import { Request, Response, Router } from "express";
import CreatePatrolController from "../../../controller/patrol/CreatePatrolController";
import GetPatrolController from "../../../controller/patrol/GetPatrolController";
import UpdatePatrolStatusController from "../../../controller/patrol/UpdatePatrolStatusController";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";

export default class PatrolRouter extends BaseRouter {
    private createPatrolController: CreatePatrolController;
    private updatePatrolStatusController: UpdatePatrolStatusController;
    private getPatrolController: GetPatrolController;

    constructor (dependency: Dependency) {
        super(dependency);
        this.createPatrolController = dependency.getCreatePatrolController();
        this.updatePatrolStatusController = dependency.getUpdatePatrolStatusController();
        this.getPatrolController = dependency.getGetPatrolController();
    }

    private getPatrol (req: Request, res: Response) {
        this.getPatrolController.getPatrol({
            id: req.params.id
        }, res);
    }

    private createPatrol (req: Request, res: Response) {
        this.createPatrolController.createPatrol({
            patrolStopIds: req.body.patrolStopIds,
            teamMembersIds: req.body.teamMembersIds,
            patrolAreaId: req.body.patrolAreaId,
            from: req.body.from,
            to: req.body.to
        }, res);
    }

    private updatePatrolStatus (req: Request, res: Response) {
        this.updatePatrolStatusController.updatePatrolStatus({
            patrolId: req.params.id,
            status: req.body.status
        }, res);
    }

    public getRouter (): Router {
        return Router()
            .get("/", (req, res) => { console.log("hello");}) // for getting patrol stops
            .get("/:id", (req, res) => this.getPatrol(req, res))
            .post("/", (req, res) => this.createPatrol(req, res))
            .put("/:id/status", (req, res) => this.updatePatrolStatus(req, res));
    }
}
