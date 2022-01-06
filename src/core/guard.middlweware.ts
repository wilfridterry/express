import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { verify } from 'jsonwebtoken';

export class Guard implements IMiddleware {
	handle(req: Request, res: Response, next: NextFunction): void {
		if (!req.user) {
			throw new HTTPError('Unauthenticated', 401);
		}

		next();
	}
}
