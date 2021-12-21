import express, { Express } from 'express';
import { userRouter } from './users/users';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App
{
    private server: Server;
    private app: Express;
    private static port:number = 3000;
    private logger: LoggerService;

    constructor(logger: LoggerService) 
    {
        this.logger = logger;
        this.app = express();
    }

    public async init() 
    {
        this.useRoutes();

        this.server = this.app.listen(App.port);

        this.logger.log(`The server is runnig on http://localhost:${App.port}`);
    }

    private useRoutes() 
    {
        this.app.use('/users', userRouter);
    }
}