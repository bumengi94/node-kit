import { Request } from "express";
import { ErrorException } from "./errors";
import { StatusCodes } from "./statusCodes";

export const validateRequest = (req: Request<any>, rules: { body?: string[] }) => {
	if (!!rules.body) {
		const invalids = rules.body.filter((rule) => !req.body[rule]);
		if (!!invalids.length) throw new ErrorException(invalids.join(", "), StatusCodes.BAD_REQUEST);
	}
};
