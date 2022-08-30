import { NextFunction, Request, Response } from "express";

export type FMiddleware<T = any> = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<T> | T | Promise<void> | void;

export type FController<T = any> = (req: Request<any, any, T>, res: Response) => Promise<void> | void;
