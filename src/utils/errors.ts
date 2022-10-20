import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "./statusCodes";
import { BaseSchema, ValidationError } from "yup";

export const handleError =
	(fn: RequestHandler<any>, validator?: BaseSchema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!!validator) await validator.validate(req, { abortEarly: false });
			await fn(req, res, next);
		} catch (error) {
			if (error instanceof ValidationError) res.status(StatusCodes.BAD_REQUEST).json(error.errors);
			else next(error);
		}
	};

export class ErrorException {
	constructor(public message: any, public status: StatusCodes) {}
}
