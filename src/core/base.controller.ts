import { Router } from "express";
import { LoggerService } from "../logger/logger.service";

export abstract class BaseController
{
    private readonly _router: Router;

    constructor(private logger: LoggerService)
    {
        this.logger = logger;
    }

    get router()
    {
        return this._router;
    }

    
}