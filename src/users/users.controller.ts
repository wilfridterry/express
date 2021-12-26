import { Router, Response, Request, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../core/base.controller';
import { Route } from '../core/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './usercontroller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	public group = '/users';

	public constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);

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

		this.bindRoutes([register, login]);
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
		console.log('ddd');
		throw new HTTPError('Unauthorized.', 401);

		this.ok(res, 'login');
	}
}
