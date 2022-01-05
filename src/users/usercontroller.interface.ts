import { Router, Response, Request, NextFunction } from 'express';

export interface IUserController {
	register(req: Request, res: Response, next: NextFunction): Promise<void>;

	login(req: Request, res: Response, next: NextFunction): Promise<void>;

	info(req: Request, res: Response, next: NextFunction): Promise<void>;
}
