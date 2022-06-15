import { Request, Response, Router } from "express";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";

export default class PatrolRouter extends BaseRouter {
    private createPatrolController;
    private updatePatrolStatusController;
    private getPatrolController;

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

    public getRouter (): Router {
        return Router()
            .get("/:id", (req, res) => this.getPatrol(req, res))
            .post("/", (req, res) => this.createPatrol(req, res))
            .put("/status", (req, res) => this.updatePatrolStatus(req, res));
    }
}
