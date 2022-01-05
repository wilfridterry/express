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
import { ValidateMiddleware } from '../core/validate.middleware';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	public group = '/users';

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middleware: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
			},
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

		this.ok(res, { email: result.email, id: result.id });
	}

	/**
	 *
	 * @param Request req
	 * @param Response res
	 */
	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		if (!(await this.userService.verifyUser(body))) {
			return next(new HTTPError('Unauthorized.', 401));
		}

		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));

		this.ok(res, { jwt: jwt });
	}

	/**
	 *
	 * @param Request req
	 * @param Response res
	 */
	async info(
		{ user }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, { email: user });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}

					resolve(token as string);
				},
			);
		});
	}
}
