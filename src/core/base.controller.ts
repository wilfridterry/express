import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { ExpressReturnType, Route } from './route.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	public group = '/';

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	/**
	 *
	 * @param res
	 * @param message
	 * @returns
	 */
	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	/**
	 *
	 * @param res
	 * @param code
	 * @param message
	 * @returns
	 */
	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: Route[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
