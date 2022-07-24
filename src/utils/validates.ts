import { Request } from "express";
import { ErrorException } from "./errors";
import { StatusCodes } from "./statusCodes";

export const validateRequest = (req: Request<any>, rules: { body?: string[] }) => {
	if (!!rules.body) {
		for (const rule of rules.body) {
			if (!req.body[rule]) throw new ErrorException(rule, StatusCodes.BAD_REQUEST);
		}
	}
};
