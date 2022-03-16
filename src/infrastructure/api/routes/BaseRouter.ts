import { Router } from "express";
import Dependency from "../../../dependency";

export default abstract class BaseRouter {
    constructor (protected _dependency: Dependency) {}
    public abstract getRouter (): Router
}
