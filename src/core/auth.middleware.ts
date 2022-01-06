import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { HTTPError } from '../errors/http-error.class';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	handle(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			//Bearer JWT
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
