import express, { Express } from 'express';
import { Server } from 'http';
import { BaseController } from './core/base.controller';
import { Exception } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IUserController } from './users/usercontroller.interface';
import { UserController } from './users/users.controller';
@injectable()
export class App {
	private server: Server;
	private app: Express;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exceptionFilter: Exception,
	) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`The server is runnig on http://localhost:${this.port}`);
	}

	private useRoutes(): void {
		this.app.use(this.userController.group, this.userController.router);
	}

	private useExeptionFilters(): void {
		const handler = this.exceptionFilter.catch.bind(this.exceptionFilter);

		this.app.use(handler);
	}

	public close(): void {
		this.server.close();
	}
}
