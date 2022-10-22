import { NextFunction, Request, Response } from "express";

export type TMiddleware<T = any> = (
	req: Request & { user: any },
	res: Response,
	next: NextFunction,
) => Promise<T> | T | Promise<void> | void;

export type TController<T = any> = (req: Request<any, any, T> & { user: any }, res: Response) => Promise<void> | void;

export interface IPaginationOptions {
	query?: string;
	page?: number;
	take?: number;
	sortBy?: string;
	direction?: "ASC" | "DESC";
}
