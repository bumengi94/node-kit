import { NextFunction, Request, RequestHandler, Response } from "express";
import { BaseSchema, ValidationError } from "yup";
import { EStatusCodes } from "~@utils/EStatusCodes";

/**
 * Error handlers for endpoints.
 * @param fn {RequestHandler}
 * @param validator {BaseSchema}
 */
export const handleError =
	(fn: RequestHandler<any>, validator?: BaseSchema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!!validator) await validator.validate(req, { abortEarly: false });
			await fn(req, res, next);
		} catch (error) {
			if (error instanceof ValidationError) res.status(EStatusCodes.BAD_REQUEST).json(error.errors);
			else next(error);
		}
	};

/**
 * Custom error class for errorCodes.
 */
export class ErrorException {
	constructor(public message: any, public status: EStatusCodes) {}
}
