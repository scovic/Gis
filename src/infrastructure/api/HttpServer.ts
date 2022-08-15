import { Application } from "express";
import BaseHttpServer from "./BaseHttpSever";
import EmployeeRouter from "./routes/EmployeeRouter";
import PatrolAreaRouter from "./routes/PatrolAreaRouter";
import PatrolRouter from "./routes/PatrolRouter";
import PatrolStopRouter from "./routes/PatrolStopRouter";

export default class HttpServer extends BaseHttpServer {
    public bindRoutes (app: Application): Application {
        return app
            .use("/api/employees", this.employees())
            .use("/api/patrols", this.patrols())
            .use("/api/areas", this.patrolAreas())
            .use("/api/stops", this.patrolStops());
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

    private patrolStops () {
        return new PatrolStopRouter(this._dependency).getRouter();
    }
}
