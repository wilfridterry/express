import { NextFunction, Request, Response } from "express";

export interface Exception
{
    catch: (err: Error, req: Request, res: Response, next: NextFunction) => void
}