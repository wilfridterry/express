import { Router, Response, Request, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../core/base.controller';
import { Route } from '../core/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './usercontroller.interface';

import fs from 'fs';
import { resolve } from 'path';

@injectable()
export class UserController extends BaseController implements IUserController {
	public group = '/users';

	public constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
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
		next(new HTTPError('Unauthorized.', 401));

		this.ok(res, 'login');
	}
}
