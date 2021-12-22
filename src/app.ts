import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { BaseController } from './core/base.controller';
import { Exception } from './errors/exeption.filter.interface';

export class App
{
    private server: Server;
    private app: Express;
    private static port:number = 3000;
    private logger: LoggerService;
    private constrollers: Array<BaseController>;
    private exceptionFilter: Exception;
    
    constructor(logger: LoggerService, controllers: Array<BaseController>, exceptionFilter: Exception) {
        this.logger = logger;
        this.app = express();
        this.constrollers = controllers;
        this.exceptionFilter = exceptionFilter;
    }

    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(App.port);

        this.logger.log(`The server is runnig on http://localhost:${App.port}`);
    }

    private useRoutes() {
        for(const controller of this.constrollers) {
            this.app.use(controller.groop, controller.router);
        }
    }

    private useExeptionFilters() {
        const handler = this.exceptionFilter.catch.bind(this.exceptionFilter);

        this.app.use(handler); 
    }
}