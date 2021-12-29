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
import { UserLoginDto } from './DTO/user-login.dto';
import { UserRegisterDto } from './DTO/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	public group = '/users';

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
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
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError('There is already a user with a current email', 422));
		}

		this.ok(res, { email: result.email });
	}

	/**
	 *
	 * @param Request req
	 * @param Response res
	 */
	login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		// next(new HTTPError('Unauthorized.', 401));

		this.ok(res, 'login');
	}
}
