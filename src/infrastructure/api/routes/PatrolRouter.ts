import { Request, Response, Router } from "express";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";

export default class PatrolRouter extends BaseRouter {
    private createPatrolController;
    private updatePatrolStatusController;

    constructor (dependency: Dependency) {
        super(dependency);
        this.createPatrolController = dependency.getCreatePatrolController();
        this.updatePatrolStatusController = dependency.getUpdatePatrolStatusController();
    }

    private createPatrol (req: Request, res: Response) {
        this.createPatrolController.createPatrol({
            patrolStops: req.body.patrolStops,
            team: req.body.team,
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

    public getRouter (): Router {
        return Router()
            .post("/", (req, res) => this.createPatrol(req, res))
            .put("/status", (req, res) => this.updatePatrolStatus(req, res));
    }
}
