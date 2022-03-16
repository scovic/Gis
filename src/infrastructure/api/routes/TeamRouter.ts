import { Request, Response, Router } from "express";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";

export default class TeamRouter extends BaseRouter {
    private createTeamController;
    private addMemberToTeamController;
    private deleteTeamController
    private listTeamsController

    constructor (dependency: Dependency) {
        super(dependency);
        this.createTeamController = dependency.getCreateTeamController();
        this.addMemberToTeamController = dependency.getAddMemberToTeamController();
        this.deleteTeamController = dependency.getDeleteTeamController();
        this.listTeamsController = dependency.getListTeamsController();
    }

    private createTeam (req: Request, res: Response) {
        this.createTeamController.createTeam({
            employeeIds: req.body.employees
        }, res);
    }

    private addMemberToTeam (req: Request, res: Response) {
        this.addMemberToTeamController.addMemberToTeam({
            employeeId: req.body.employeeId,
            teamId: req.body.teamId
        }, res);
    }

    private deleteTeam (req: Request, res: Response) {
        this.deleteTeamController.deleteTeam({
            teamId: req.body.teamId
        }, res);
    }

    private listTeams (req: Request, res: Response) {
        this.listTeamsController.listTeams(res);
    }

    public getRouter (): Router {
        return Router()
            .post("/", (req, res) => this.createTeam(req, res))
            .get("/", (req, res) => this.listTeams(req, res))
            .put("/", (req, res) => this.addMemberToTeam(req, res))
            .delete("/", (req, res) => this.deleteTeam(req, res));
    }
}
