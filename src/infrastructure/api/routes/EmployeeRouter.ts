import { Request, Response, Router } from "express";
import Dependency from "../../../dependency";
import BaseRouter from "./BaseRouter";


export default class EmployeeRouter extends BaseRouter {
    private controller;

    constructor (dependency: Dependency) {
        super(dependency);
        this.controller = dependency.getEmployeeController();
    }

    private createEmployee (req: Request, res: Response) {
        this.controller.createEmployee(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            res
        );
    }

    public getRouter (): Router {
        return Router()
            .post("/", (req, res) => this.createEmployee(req, res));
    }
}
