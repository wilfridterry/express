import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { BaseController } from './core/base.controller';

export class App
{
    private server: Server;
    private app: Express;
    private static port:number = 3000;
    private logger: LoggerService;
    private constrollers: Array<BaseController>;
    
    constructor(logger: LoggerService, controllers: Array<BaseController>) {
        this.logger = logger;
        this.app = express();
        this.constrollers = controllers;
    }

    public async init() {
        this.useRoutes();

        this.server = this.app.listen(App.port);

        this.logger.log(`The server is runnig on http://localhost:${App.port}`);
    }

    private useRoutes() {
        for(const controller of this.constrollers) {
            this.app.use(controller.groop, controller.router);
        }
    }
}