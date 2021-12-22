import { Router, Response, Request, NextFunction } from "express";
import { BaseController } from "../core/base.controller";
import { Route } from "../core/route.interface";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController
{
    public groop: string = '/users';

    public constructor(logger: LoggerService) {
        super(logger);

        const register: Route = {
            method: 'post',
            path: '/register',
            func: this.register,
        };

        const login: Route = {
            method: 'post',
            path: '/login',
            func: this.login,
        };

        this.bindRoutes([
            register,
            login
        ]);
    }

    /**
     * 
     * @param Request req 
     * @param Response res 
     */
    public register(req: Request, res: Response, next: NextFunction): void {
        this.ok(res, 'register');
    }

    /**
     * 
     * @param Request req 
     * @param Response res 
     */
    public login(req: Request, res: Response, next: NextFunction): void {
        this.ok(res, 'login')
    }
}