import Dependency from "./dependency";
import HttpServer from "./infrastructure/api/HttpServer";

(async () => {
    const dependency = Dependency.makeDependency(process.env);
    new HttpServer(dependency)
        .start(dependency.getConfig().getServerConfig());
})();
