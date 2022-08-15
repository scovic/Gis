import { Application } from "express";
import BaseHttpServer from "./BaseHttpSever";
import EmployeeRouter from "./routes/EmployeeRouter";
import PatrolAreaRouter from "./routes/PatrolAreaRouter";
import PatrolRouter from "./routes/PatrolRouter";

export default class HttpServer extends BaseHttpServer {
    public bindRoutes (app: Application): Application {
        return app
            .use("/api/employees", this.employees())
            .use("/api/patrols", this.patrols())
            .use("/api/areas", this.patrolAreas());
    }

    private employees () {
        return new EmployeeRouter(this._dependency).getRouter();
    }

    private patrols () {
        return new PatrolRouter(this._dependency).getRouter();
    }

    private patrolAreas () {
        return new PatrolAreaRouter(this._dependency).getRouter();
    }
}
