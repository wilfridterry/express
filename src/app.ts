import express, { Express } from 'express';
import { Server } from 'http';
import { BaseController } from './core/base.controller';
import { Exception } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { UserController } from './users/users.controller';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './core/auth.middleware';
@injectable()
export class App {
	private server: Server;
	private app: Express;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exceptionFilter: Exception,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();

		await this.prismaService.connect();

		this.server = this.app.listen(this.port);
		this.logger.log(`The server is runnig on http://localhost:${this.port}`);
	}

	private useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.handle.bind(authMiddleware));
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
