import { Response, Router } from "express";
import { LoggerService } from "../logger/logger.service";
import { Route } from "./route.interface";

export abstract class BaseController
{
    private readonly _router: Router;

    public groop: string = '/';

    constructor(private logger: LoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    /**
     * 
     * @param res 
     * @param message 
     * @returns 
     */
    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
    }

    /**
     * 
     * @param res 
     * @param code 
     * @param message 
     * @returns 
     */
    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public created(res: Response) {
        res.sendStatus(201);
    }

    protected bindRoutes(routes: Route[]) {
        for(const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}