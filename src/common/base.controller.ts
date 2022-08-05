import {Router} from "express";
import {RoutesInterface} from "./routes.interface";

export abstract class BaseController {
    private readonly _router: Router;

    constructor() {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    protected bindRoutes(routes: RoutesInterface[]) {
        for (const route of routes) {
            console.log(route)
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}