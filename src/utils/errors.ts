import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "./statusCodes";

export const handleError = (fn: RequestHandler<any>) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await fn(req, res, next);
	} catch (error) {
		if (error instanceof ErrorException) res.status(error.status).json(error.message);
		else next(error);
	}
};

export class ErrorException extends Error {
	constructor(message: string, public status: StatusCodes) {
		super(message);
	}
}
