import { Request, Response } from "express";
import { StatusCodes } from "../utils/statusCodes";
import { validateRequest } from "../utils/validates";
import { sign } from "jsonwebtoken";
import { loginUserService, updateUserService } from "../services/user.service";
import _ from "lodash";
import { ErrorCodes } from "../utils/errorCodes";
import { User } from "../entities/User";
import { logger } from "../utils/logger";

const log = logger("auth.controller");

export const checkAuthController = async (req: Request, res: Response) => {
	log.debug("checkAuthController started");
	res.json(req["user"]);
};

export const loginController = async (req: Request<any, any, User>, res: Response) => {
	log.debug("loginController started");
	validateRequest(req, { body: ["phone", "password"] });
	req.body.hash = req.body["password"];
	const result = _.toPlainObject(await loginUserService(req.body)) as User;
	const token = sign(result, process.env.SECRET, { expiresIn: "1w" });
	log.debug("loginController ended");
	res.status(StatusCodes.OK).json({ token });
};

export const activateController = async (req: Request<any, any, User>, res: Response) => {
	log.debug("activateController started");
	validateRequest(req, { body: ["phone", "password"] });
	try {
		req.body.hash = req.body["password"];
		const result = "";
		const token = sign(result, process.env.SECRET, { expiresIn: "1w" });
		log.debug("activateController ended");
		res.status(StatusCodes.CREATED).json({ token });
	} catch (e) {
		log.error("activateController error", e);
		res.status(StatusCodes.CONFLICT).json(ErrorCodes.EXIST_USER);
	}
};

export const forgotController = (req: Request, res: Response) => {
	log.debug("forgotController started");
	validateRequest(req, { body: ["phone"] });
	//TODO: send sms with code
	log.debug("forgotController ended");
	res.sendStatus(StatusCodes.OK);
};

export const updateAuthController = async (req: Request, res: Response) => {
	log.debug("updateAuthController started");
	if (req.body["password"] !== undefined) req.body.hash = req.body["password"];
	const result = await updateUserService(req["user"].id, req.body);
	log.debug("updateAuthController ended");
	res.json(result);
};
